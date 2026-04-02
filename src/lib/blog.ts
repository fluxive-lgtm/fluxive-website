
import { BlogPost, BlogPostData, blogPosts as staticPosts, LocalizedContent } from '@/data/blogData';

export type { BlogPost, BlogPostData };

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get localized content. In strict mode, if content is missing, return empty string instead of falling back.
function getLocalizedContent(content: LocalizedContent, lang: 'en' | 'nl' | 'fr', strict: boolean = false): string {
    if (strict) {
        // If strict is true, only return the exact language content, NO fallbacks
        // We trim to ensure we don't return " " as valid content
        return (content[lang] || '').trim();
    }
    // Default fallback behavior
    return content[lang] || content.en || '';
}

function flattenPost(post: BlogPostData, lang: 'en' | 'nl' | 'fr', strict: boolean = false): BlogPost {
    // Determine if we should treat this post as "empty" in this language
    // If we're strict and the target language is missing, getLocalizedContent returns ''
    return {
        ...post,
        title: getLocalizedContent(post.title, lang, strict),
        excerpt: getLocalizedContent(post.excerpt, lang, strict),
        content: getLocalizedContent(post.content, lang, strict),
    };
}

// Helper to convert API response to BlogPostData structure
// The API might return flat strings (legacy) or JSON objects (multilingual)
function apiPostToBlogPostData(apiPost: any): BlogPostData {
    const processField = (field: any): LocalizedContent => {
        if (typeof field === 'object' && field !== null && (field.en || field.nl || field.fr)) {
            return {
                en: field.en || '',
                nl: field.nl || '',
                fr: field.fr || ''
            };
        }
        // Legacy fallback: string
        const val = String(field || '');
        return { en: val, nl: val, fr: val };
    };

    return {
        slug: apiPost.slug,
        title: processField(apiPost.title),
        excerpt: processField(apiPost.excerpt),
        content: processField(apiPost.content),
        date: apiPost.date,
        readingTime: apiPost.readingTime,
        category: apiPost.category,
        author: apiPost.author,
        image: apiPost.image,
        coverImage: apiPost.coverImage,
        videoEmbed: apiPost.videoEmbed,
        tags: apiPost.tags,
        featured: apiPost.featured,
        media: apiPost.media
    };
}

export async function getPosts(lang: 'en' | 'nl' | 'fr' = 'en', strictFilter = false): Promise<BlogPost[]> {
    // During build (server-side), return static data to avoid "Invalid URL" errors
    if (typeof window === 'undefined') {
        const posts = staticPosts.map(post => flattenPost(post, lang, strictFilter));
        if (strictFilter) {
            return posts.filter(p => p.title && p.title.trim() !== '' && p.content && p.content.trim() !== '');
        }
        return posts;
    }

    try {
        // Fetch from API with no-store to prevent caching
        const res = await fetch('/api/blog', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const apiPosts = await res.json();

        // Convert API posts to internal format
        const dynamicPosts = apiPosts.map((p: any) => flattenPost(apiPostToBlogPostData(p), lang, strictFilter));

        if (strictFilter) {
            return dynamicPosts.filter((p: BlogPost) => p.title && p.title.trim() !== '' && p.content && p.content.trim() !== '');
        }

        // Return dynamic posts
        if (dynamicPosts.length > 0) {
            return dynamicPosts;
        }

        // Fallback to static if API is empty
        const fallbackPosts = staticPosts.map(post => flattenPost(post, lang, strictFilter));
        if (strictFilter) {
            return fallbackPosts.filter(p => p.title && p.title.trim() !== '' && p.content && p.content.trim() !== '');
        }
        return fallbackPosts;

    } catch (error) {
        console.warn("API fetch failed (likely local dev mode parsing raw PHP). Falling back to static data.");
        const fallbackPosts = staticPosts.map(post => flattenPost(post, lang, strictFilter));
        if (strictFilter) {
            return fallbackPosts.filter(p => p.title && p.title.trim() !== '' && p.content && p.content.trim() !== '');
        }
        return fallbackPosts;
    }
}

export async function getPostBySlug(slug: string, lang: 'en' | 'nl' | 'fr' = 'en'): Promise<BlogPost | null> {
    try {
        const res = await fetch(`/api/blog?slug=${slug}`, { cache: 'no-store' });
        if (res.ok) {
            const apiPost = await res.json();
            return flattenPost(apiPostToBlogPostData(apiPost), lang);
        }
    } catch (error) {
        console.error("API fetch failed for slug:", slug, error);
    }

    // Fallback to static
    const post = staticPosts.find(p => p.slug === slug);
    return post ? flattenPost(post, lang) : null;
}

export async function getFullPostBySlug(slug: string): Promise<BlogPostData | null> {
    try {
        const res = await fetch(`/api/blog?slug=${slug}`, { cache: 'no-store' });
        if (res.ok) {
            const apiPost = await res.json();
            return apiPostToBlogPostData(apiPost);
        }
    } catch (error) {
        console.error("API fetch failed for slug:", slug, error);
    }

    // Fallback to static
    return staticPosts.find(p => p.slug === slug) || null;
}

export async function savePost(post: BlogPost): Promise<void> {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post),
        cache: 'no-store'
    });

    if (!res.ok) {
        let errorMessage = 'Failed to save post';
        try {
            const error = await res.json();
            errorMessage = error.error || errorMessage;
        } catch (e) {
            errorMessage = `Server Error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMessage);
    }
}

export async function deletePost(slug: string): Promise<void> {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    const res = await fetch(`/api/blog?slug=${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete post');
    }
}

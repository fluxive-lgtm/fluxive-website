
import { BlogPost, BlogPostData, blogPosts as staticPosts, LocalizedContent } from '@/data/blogData';

export type { BlogPost, BlogPostData };

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to flatten localized content
function getLocalizedContent(content: LocalizedContent, lang: 'en' | 'nl' | 'fr'): string {
    return content[lang] || content.en;
}

function flattenPost(post: BlogPostData, lang: 'en' | 'nl' | 'fr'): BlogPost {
    return {
        ...post,
        title: getLocalizedContent(post.title, lang),
        excerpt: getLocalizedContent(post.excerpt, lang),
        content: getLocalizedContent(post.content, lang),
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
        tags: apiPost.tags,
        featured: apiPost.featured
    };
}

export async function getPosts(lang: 'en' | 'nl' | 'fr' = 'en'): Promise<BlogPost[]> {
    // During build (server-side), return static data to avoid "Invalid URL" errors
    if (typeof window === 'undefined') {
        return staticPosts.map(post => flattenPost(post, lang));
    }

    try {
        // Fetch from API
        const res = await fetch('/api/blog.php');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const apiPosts = await res.json();

        // Convert API posts to internal format
        const dynamicPosts = apiPosts.map((p: any) => flattenPost(apiPostToBlogPostData(p), lang));

        // Combine with static posts (optional, or just return dynamic)
        // For now, let's return dynamic posts. If empty, maybe fallback?
        // But user wants their NEW post.
        if (dynamicPosts.length > 0) {
            return dynamicPosts;
        }

        // Fallback to static if API is empty (e.g. local dev without DB)
        return staticPosts.map(post => flattenPost(post, lang));

    } catch (error) {
        console.error("API fetch failed, falling back to static data:", error);
        return staticPosts.map(post => flattenPost(post, lang));
    }
}

export async function getPostBySlug(slug: string, lang: 'en' | 'nl' | 'fr' = 'en'): Promise<BlogPost | null> {
    try {
        const res = await fetch(`/api/blog.php?slug=${slug}`);
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
        const res = await fetch(`/api/blog.php?slug=${slug}`);
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

    const res = await fetch('/api/blog.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
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

    const res = await fetch(`/api/blog.php?slug=${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete post');
    }
}

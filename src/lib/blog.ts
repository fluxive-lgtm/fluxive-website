
import { BlogPost, BlogPostData, blogPosts, LocalizedContent } from '@/data/blogData';

export type { BlogPost };

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
        // Categories labels are in a separate array, but the category ID remains the same.
        // If we wanted localized category names in the post object, we'd map them here.
    };
}

export async function getPosts(lang: 'en' | 'nl' | 'fr' = 'en'): Promise<BlogPost[]> {
    // Simulate network delay
    await delay(100);
    return blogPosts.map(post => flattenPost(post, lang));
}

export async function getPostBySlug(slug: string, lang: 'en' | 'nl' | 'fr' = 'en'): Promise<BlogPost | null> {
    await delay(100);
    const post = blogPosts.find(p => p.slug === slug);
    return post ? flattenPost(post, lang) : null;
}

export async function savePost(post: BlogPost): Promise<void> {
    await delay(500);
    console.log('Mock save post:', post);
    // Cannot push flat post to nested array without other languages.
    // For mock purposes, we just log it.
}

export async function deletePost(slug: string): Promise<void> {
    await delay(500);
    console.log('Mock delete post:', slug);
    const index = blogPosts.findIndex(p => p.slug === slug);
    if (index >= 0) {
        blogPosts.splice(index, 1);
    }
}


import { BlogPost } from '@/data/blogData'; // Keep BlogPost import as it's used in function signatures
export type { BlogPost };
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper to determine if we are running on the server or client
const isServer = typeof window === 'undefined';
// Helper to fetch from PHP API
async function fetchFromPhp(endpoint: string, options: RequestInit = {}) {
    // In production (static export), the API is at /api/file.php
    // In dev, we might need to proxy or just use relative path if serving PHP locally
    // For now, assuming relative path works if deployed, or absolute URL if dev
    const baseUrl = isServer ? 'http://localhost:3000/api' : '/api';
    const url = `${baseUrl}/${endpoint}`;

    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`API call failed: ${res.statusText}`);
    }
    return res.json();
}

export async function getPosts(): Promise<BlogPost[]> {
    try {
        // If build time (static generation), we might want to fetch from DB directly or skip
        // But since we are moving to dynamic PHP, static generation of blog pages 
        // might need to fetch from the deployed API or be converted to client-side fetching.
        // For simplicity in this migration, let's assume client-side fetching for admin
        // and static generation for public pages (which requires the API to be up).

        // However, for the Admin Dashboard, we definitely fetch from API.
        return await fetchFromPhp('blog.php');
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        return await fetchFromPhp(`blog.php?slug=${slug}`);
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function savePost(post: BlogPost): Promise<void> {
    await fetchFromPhp('blog.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
}

export async function deletePost(slug: string): Promise<void> {
    await fetchFromPhp(`blog.php?slug=${slug}`, {
        method: 'DELETE',
    });
}

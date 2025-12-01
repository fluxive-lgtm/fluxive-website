"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { PostForm } from "@/components/admin/PostForm"
import { getFullPostBySlug, BlogPost, BlogPostData } from "@/lib/blog"

function EditPostContent() {
    const searchParams = useSearchParams()
    const slug = searchParams.get("slug")
    const [post, setPost] = useState<BlogPost | BlogPostData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return
            try {
                const data = await getFullPostBySlug(slug)
                setPost(data)
            } catch (error) {
                console.error("Failed to fetch post:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPost()
    }, [slug])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">Edit Post</h1>
            <PostForm initialData={post} isEditing />
        </div>
    )
}

export default function EditPostPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPostContent />
        </Suspense>
    )
}

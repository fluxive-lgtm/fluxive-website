"use client"

import { PostForm } from "@/components/admin/PostForm"

export default function NewPostPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">Create New Post</h1>
            <PostForm />
        </div>
    )
}

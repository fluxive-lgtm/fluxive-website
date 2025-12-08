"use client"

import { useEffect, useState } from "react"
import { getPosts, BlogPost } from "@/lib/blog"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { PostActions } from "@/components/admin/PostActions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function AdminDashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts()
                setPosts(data)
            } catch (error) {
                console.error("Failed to fetch posts:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold font-display">Blog Posts</h2>
                <Link href="/admin/posts/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Create New Post
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No posts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post) => (
                                <TableRow key={post.slug}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell className="text-right">
                                        <PostActions slug={post.slug} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

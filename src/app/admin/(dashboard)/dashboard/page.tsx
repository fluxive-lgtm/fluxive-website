import { getPosts } from "@/lib/blog"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PostActions } from "@/components/admin/PostActions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function AdminDashboard() {
    const posts = await getPosts()

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
                        {posts.map((post) => (
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

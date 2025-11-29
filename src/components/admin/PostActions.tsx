"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { deletePost } from "@/lib/blog"

interface PostActionsProps {
    slug: string
}

export function PostActions({ slug }: PostActionsProps) {
    const router = useRouter()
    const { toast } = useToast()

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return

        try {
            await deletePost(slug)
            toast({ title: "Post deleted successfully" })
            router.refresh()
        } catch (error) {
            toast({ title: "Error deleting post", variant: "destructive" })
        }
    }

    return (
        <div className="flex justify-end gap-2">
            <Link href={`/admin/posts/edit?slug=${slug}`}>
                <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4 text-blue-500" />
                </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
        </div>
    )
}

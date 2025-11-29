"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { blogCategories, BlogPost } from "@/data/blogData"
import { savePost } from "@/lib/blog"

interface PostFormData {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    image: string
    featured: boolean
}

interface PostFormProps {
    initialData?: BlogPost
    isEditing?: boolean
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imageUrl, setImageUrl] = useState(initialData?.image || "")

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
            category: initialData?.category || "wifi",
            image: initialData?.image || "",
            featured: initialData?.featured || false
        }
    })

    const title = watch("title")

    // Auto-generate slug from title only if creating new post
    const generateSlug = (value: string) => {
        if (!isEditing) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            setValue("slug", slug)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload.php", {
                method: "POST",
                body: formData,
            })

            if (res.ok) {
                const data = await res.json()
                setImageUrl(data.url)
                setValue("image", data.url)
                toast({ title: "Image uploaded successfully" })
            } else {
                toast({ title: "Upload failed", variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Upload error", variant: "destructive" })
        }
    }

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true)
        try {
            // Construct full BlogPost object
            const blogPost: BlogPost = {
                ...data,
                category: data.category as any, // Cast to any to bypass strict type check for now, or import BlogCategory
                date: initialData?.date || new Date().toISOString().split('T')[0],
                readingTime: initialData?.readingTime || "5 min read", // Placeholder
                author: initialData?.author || {
                    name: "Admin",
                    role: "Administrator",
                    image: "/images/avatars/alice.jpg" // Default avatar
                },
                tags: initialData?.tags || []
            }

            await savePost(blogPost)
            toast({ title: isEditing ? "Post updated successfully" : "Post created successfully" })
            router.push("/admin/dashboard")
            router.refresh()
        } catch (error) {
            toast({ title: isEditing ? "Failed to update post" : "Failed to create post", variant: "destructive" })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        {...register("title", { required: true })}
                        onChange={(e) => {
                            register("title").onChange(e)
                            generateSlug(e.target.value)
                        }}
                    />
                    {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...register("slug", { required: true })} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(val: string) => setValue("category", val)} defaultValue={initialData?.category || "wifi"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {blogCategories.filter(c => c.id !== 'all').map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2 pt-8">
                    <Checkbox
                        id="featured"
                        checked={watch("featured")}
                        onCheckedChange={(checked: boolean) => setValue("featured", checked)}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" {...register("excerpt", { required: true })} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="flex gap-4 items-center">
                    <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full"
                    />
                    {imageUrl && (
                        <div className="h-10 w-10 relative rounded overflow-hidden border">
                            <img src={imageUrl} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                </div>
                <Input type="hidden" {...register("image")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                    id="content"
                    className="min-h-[400px] font-mono"
                    {...register("content", { required: true })}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Post" : "Create Post")}
                </Button>
            </div>
        </form>
    )
}

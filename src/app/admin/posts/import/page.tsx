"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PostForm } from "@/components/admin/PostForm"
import { useToast } from "@/components/ui/use-toast"
import { BlogPost } from "@/data/blogData"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function ImportPostPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [importedData, setImportedData] = useState<BlogPost | null>(null)

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return

        setIsLoading(true)
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1]

        try {
            const res = await fetch("/api/scrape.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ url }),
            })

            if (!res.ok) {
                throw new Error("Failed to fetch URL")
            }

            const data = await res.json()

            // Map scraped data to BlogPost structure
            const newPost: BlogPost = {
                slug: "", // Will be generated from title
                title: data.title || "",
                excerpt: data.excerpt || "",
                content: data.content || "",
                date: new Date().toISOString().split('T')[0],
                readingTime: "5 min", // Default
                category: data.category || "wifi",
                author: {
                    name: "Admin",
                    role: "Administrator",
                    image: "/images/avatars/alice.jpg"
                },
                image: data.image || "",
                tags: [],
                featured: false
            }

            setImportedData(newPost)
            toast({ title: "Content imported successfully" })
        } catch (error) {
            console.error(error)
            toast({
                title: "Import failed",
                description: "Could not fetch content from the provided URL.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (importedData) {
        return (
            <div className="container mx-auto py-10">
                <div className="mb-6 flex items-center gap-4">
                    <Button variant="ghost" onClick={() => setImportedData(null)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Import
                    </Button>
                    <h1 className="text-3xl font-bold font-display">Finalize Imported Post</h1>
                </div>
                <PostForm initialData={importedData} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Import Post from URL</CardTitle>
                    <CardDescription>
                        Paste a URL to automatically fetch the title, description, image, and category.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleImport} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url">Article URL</Label>
                            <Input
                                id="url"
                                placeholder="https://example.com/article"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                "Import Content"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

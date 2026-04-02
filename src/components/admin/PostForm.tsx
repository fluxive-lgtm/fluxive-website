"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { blogCategories, BlogPost, BlogPostData } from "@/data/blogData"
import { savePost } from "@/lib/blog"
import { useLanguage } from "@/context/LanguageContext"
import { Loader2, X, Upload, Trash2 } from "lucide-react"

interface PostFormData {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    image: string
    coverImage: string
    videoEmbed: string
    featured: boolean
}

interface PostFormProps {
    initialData?: BlogPost | BlogPostData
    isEditing?: boolean
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { language: currentLang } = useLanguage() // We might use this for UI labels, but editing should be explicit
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imageUrl, setImageUrl] = useState(initialData?.image || "")
    const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImage || "")
    const [media, setMedia] = useState<{ url: string, type: 'image' | 'video' }[]>(initialData?.media || [])
    const [activeTab, setActiveTab] = useState<'en' | 'nl' | 'fr'>('en')

    // We need to manage the multilingual state manually or via a more complex form structure
    // Since initialData is flattened (BlogPost), we can't easily get the other languages if we are editing.
    // Ideally, we should fetch the full BlogPostData.
    // For now, if we are editing, we might be overwriting with single-language data if we don't have the full data.
    // BUT, let's assume for new posts we start fresh.
    // For existing posts, we might need to fetch the full data. 
    // Let's initialize with empty strings for other languages if not present.

    // NOTE: This implementation assumes we are creating NEW posts or overwriting. 
    // To properly edit existing multilingual posts, we would need to pass BlogPostData instead of BlogPost.

    const [formData, setFormData] = useState({
        title: {
            en: (initialData as BlogPostData)?.title?.en || (initialData as BlogPost)?.title || "",
            nl: (initialData as BlogPostData)?.title?.nl || "",
            fr: (initialData as BlogPostData)?.title?.fr || ""
        },
        excerpt: {
            en: (initialData as BlogPostData)?.excerpt?.en || (initialData as BlogPost)?.excerpt || "",
            nl: (initialData as BlogPostData)?.excerpt?.nl || "",
            fr: (initialData as BlogPostData)?.excerpt?.fr || ""
        },
        content: {
            en: (initialData as BlogPostData)?.content?.en || (initialData as BlogPost)?.content || "",
            nl: (initialData as BlogPostData)?.content?.nl || "",
            fr: (initialData as BlogPostData)?.content?.fr || ""
        },
    })

    // If we are editing, we should try to populate the other languages if possible.
    // Since we don't have them in initialData (it's flattened), we'll just use the current value for the current language
    // and leave others empty (or copy them as fallback).
    // A better approach would be to fetch the full post data by slug in the parent component or here.

    useEffect(() => {
        if (initialData) {
            const isLocalized = (data: any): data is BlogPostData => {
                return typeof data.title === 'object';
            }

            if (isLocalized(initialData)) {
                setFormData({
                    title: { en: initialData.title.en, nl: initialData.title.nl, fr: initialData.title.fr },
                    excerpt: { en: initialData.excerpt.en, nl: initialData.excerpt.nl, fr: initialData.excerpt.fr },
                    content: { en: initialData.content.en, nl: initialData.content.nl, fr: initialData.content.fr },
                })
            } else {
                // Fallback for flattened data (shouldn't happen if we use getFullPostBySlug)
                setFormData({
                    title: { en: initialData.title, nl: initialData.title, fr: initialData.title },
                    excerpt: { en: initialData.excerpt, nl: initialData.excerpt, fr: initialData.excerpt },
                    content: { en: initialData.content, nl: initialData.content, fr: initialData.content },
                })
            }
        }
    }, [initialData])

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
        defaultValues: {
            title: (initialData as BlogPostData)?.title?.en || (initialData as BlogPost)?.title || "",
            slug: initialData?.slug || "",
            excerpt: (initialData as BlogPostData)?.excerpt?.en || (initialData as BlogPost)?.excerpt || "",
            content: (initialData as BlogPostData)?.content?.en || (initialData as BlogPost)?.content || "",
            category: initialData?.category || "wifi",
            image: initialData?.image || "",
            coverImage: initialData?.coverImage || "",
            videoEmbed: initialData?.videoEmbed || "",
            featured: initialData?.featured || false
        }
    })

    // Update the react-hook-form values when we change the active tab or type
    // Actually, we should probably just use react-hook-form for the shared fields (slug, category, image)
    // and manage the multilingual fields with local state, then combine on submit.

    const handleInputChange = (field: 'title' | 'excerpt' | 'content', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [activeTab]: value
            }
        }))

        // Also update the react-hook-form value for validation if it's the 'en' tab (primary)
        if (activeTab === 'en') {
            setValue(field, value)
        }
    }

    // Auto-generate slug from English title
    const generateSlug = (value: string) => {
        if (!isEditing && activeTab === 'en') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            setValue("slug", slug)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'coverImage') => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

        try {
            const res = await fetch("/api/upload.php", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })

            if (res.ok) {
                const data = await res.json()
                if (field === 'image') {
                    setImageUrl(data.url)
                    setValue("image", data.url)
                } else {
                    setCoverImageUrl(data.url)
                    setValue("coverImage", data.url)
                }
                toast({ title: "File uploaded successfully" })
            } else {
                const errorData = await res.json().catch(() => ({ error: "Upload failed" }));
                toast({ title: "Upload failed", description: errorData.error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Upload error", description: "Network error or server unreachable", variant: "destructive" })
        }
    }

    const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        // Count existing
        const currentImages = media.filter(m => m.type === 'image').length;
        const currentVideos = media.filter(m => m.type === 'video').length;

        // Count new
        const newImages = files.filter(f => f.type.startsWith('image/')).length;
        const newVideos = files.filter(f => f.type.startsWith('video/')).length;

        if (currentImages + newImages > 10) {
            toast({ title: "Error", description: `Limit reached. You can only have 10 images. Current: ${currentImages}, Adding: ${newImages}`, variant: "destructive" });
            return;
        }
        if (currentVideos + newVideos > 5) {
            toast({ title: "Error", description: `Limit reached. You can only have 5 videos. Current: ${currentVideos}, Adding: ${newVideos}`, variant: "destructive" });
            return;
        }

        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

        // Upload Loop
        for (const file of files) {
            const formData = new FormData()
            formData.append("file", file)

            try {
                const res = await fetch("/api/upload.php", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData,
                })
                if (res.ok) {
                    const data = await res.json()
                    const type = file.type.startsWith('video/') ? 'video' : 'image';
                    setMedia(prev => [...prev, { url: data.url, type }])
                } else {
                    const errorData = await res.json().catch(() => ({ error: "Upload failed" }));
                    toast({ title: `Failed to upload ${file.name}`, description: errorData.error, variant: "destructive" })
                }
            } catch (error) {
                toast({ title: `Error uploading ${file.name}`, variant: "destructive" })
            }
        }
        toast({ title: "Gallery upload complete" });
        // Clear input
        e.target.value = "";
    }

    const removeMedia = (index: number) => {
        setMedia(prev => prev.filter((_, i) => i !== index));
    }

    const handleAutoTranslate = () => {
        // Simple mock translation: Copy English content to other languages if they are empty
        // In a real app, this would call a translation API (Google/DeepL/OpenAI)

        const enTitle = formData.title.en;
        const enExcerpt = formData.excerpt.en;
        const enContent = formData.content.en;

        if (!enTitle) {
            toast({ title: "Please enter English content first", variant: "destructive" });
            return;
        }

        setFormData(prev => ({
            title: {
                en: prev.title.en,
                nl: prev.title.nl || `[NL] ${enTitle}`,
                fr: prev.title.fr || `[FR] ${enTitle}`
            },
            excerpt: {
                en: prev.excerpt.en,
                nl: prev.excerpt.nl || `[NL] ${enExcerpt}`,
                fr: prev.excerpt.fr || `[FR] ${enExcerpt}`
            },
            content: {
                en: prev.content.en,
                nl: prev.content.nl || `[NL] ${enContent}`,
                fr: prev.content.fr || `[FR] ${enContent}`
            }
        }));

        toast({ title: "Auto-filled translations (Mock)", description: "Content copied to NL/FR. Connect a translation API for real translations." });
    };

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true)
        try {
            // Construct full BlogPost object with multilingual data
            const blogPost: any = {
                ...data,
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                category: data.category as any,
                date: initialData?.date || new Date().toISOString().split('T')[0],
                readingTime: initialData?.readingTime || "5 min read",
                author: initialData?.author || {
                    name: "Admin",
                    role: "Administrator",
                    image: "/images/avatars/alice.jpg"
                },
                tags: initialData?.tags || [],
                media: media
            }

            await savePost(blogPost)
            toast({ title: isEditing ? "Post updated successfully" : "Post created successfully" })
            router.push("/admin/dashboard")
            router.refresh()
        } catch (error) {
            console.error(error)
            toast({
                title: isEditing ? "Failed to update post" : "Failed to create post",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Check if a language tab is "complete" (has title and content)
    const isLangComplete = (lang: 'en' | 'nl' | 'fr') => {
        return formData.title[lang].trim() !== "" && formData.content[lang].trim() !== "";
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">

            {/* Language Selection Tabs */}
            <div className="space-y-2 mb-6">
                <div className="flex items-end justify-between">
                    <div className="space-y-2 w-full max-w-md">
                        <Label>Editing Language</Label>
                        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'en' | 'nl' | 'fr')}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="en" className="relative">
                                    English
                                    <span className={`absolute top-1 right-2 w-2 h-2 rounded-full ${isLangComplete('en') ? 'bg-green-500' : 'bg-red-500'}`} title={isLangComplete('en') ? 'Content Complete' : 'Missing Content'} />
                                </TabsTrigger>
                                <TabsTrigger value="nl" className="relative">
                                    Dutch
                                    <span className={`absolute top-1 right-2 w-2 h-2 rounded-full ${isLangComplete('nl') ? 'bg-green-500' : 'bg-red-500'}`} title={isLangComplete('nl') ? 'Content Complete' : 'Missing Content'} />
                                </TabsTrigger>
                                <TabsTrigger value="fr" className="relative">
                                    French
                                    <span className={`absolute top-1 right-2 w-2 h-2 rounded-full ${isLangComplete('fr') ? 'bg-green-500' : 'bg-red-500'}`} title={isLangComplete('fr') ? 'Content Complete' : 'Missing Content'} />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <Button type="button" variant="secondary" onClick={handleAutoTranslate} title="Auto-fill other languages from English">
                        Auto-Translate (Mock)
                    </Button>
                </div>
                <p className="text-sm text-gray-500">Select the language tab to edit. Ensure all tabs have a green dot before publishing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title ({activeTab.toUpperCase()})</Label>
                    <Input
                        id="title"
                        value={formData.title[activeTab]}
                        onChange={(e) => {
                            handleInputChange('title', e.target.value)
                            generateSlug(e.target.value)
                        }}
                        placeholder={`Enter title in ${activeTab === 'en' ? 'English' : activeTab === 'nl' ? 'Dutch' : 'French'}`}
                    />
                    {activeTab === 'en' && errors.title && <span className="text-red-500 text-sm">Title (English) is required</span>}
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
                                    {cat.label[currentLang as keyof typeof cat.label] || cat.label.en}
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
                <Label htmlFor="excerpt">Excerpt ({activeTab.toUpperCase()})</Label>
                <Textarea
                    id="excerpt"
                    value={formData.excerpt[activeTab]}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder={`Enter excerpt in ${activeTab}`}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Featured Media (Image or Video)</Label>
                <div className="flex gap-4 items-center">
                    <Input
                        id="image-upload"
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        className="w-full"
                    />
                    {imageUrl && (
                        <div className="h-20 w-20 relative rounded overflow-hidden border">
                            {imageUrl.match(/\.(mp4|webm)$/i) ? (
                                <video src={imageUrl} preload="metadata" className="object-cover w-full h-full" />
                            ) : (
                                <img src={imageUrl} alt="Preview" className="object-cover w-full h-full" />
                            )}
                        </div>
                    )}
                </div>
                <Input type="hidden" {...register("image")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image (Optional)</Label>
                <div className="flex gap-4 items-center">
                    <Input
                        id="cover-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'coverImage')}
                        className="w-full"
                    />
                    {coverImageUrl && (
                        <div className="h-20 w-20 relative rounded overflow-hidden border">
                            <img src={coverImageUrl} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                </div>
                <Input type="hidden" {...register("coverImage")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="videoEmbed">YouTube Video Embed Code (Optional)</Label>
                <Textarea
                    id="videoEmbed"
                    placeholder={`<iframe width="560" height="315" src="https://www.youtube.com/embed/..." ...></iframe>`}
                    {...register("videoEmbed")}
                    className="font-mono text-xs"
                />
                <p className="text-xs text-gray-500">Paste the full iframe code from YouTube here. It will be displayed below the title.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown) - {activeTab.toUpperCase()}</Label>
                <Textarea
                    id="content"
                    className="min-h-[400px] font-mono"
                    value={formData.content[activeTab]}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder={`Enter content in ${activeTab}`}
                />
            </div>

            {/* Post Gallery Section */}
            <div className="space-y-2 pt-4 border-t">
                <label className="text-sm font-medium">Post Gallery (Images: Max 10, Videos: Max 5)</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleGallerySelect}
                    />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                        Click to upload multiple files
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WEBP, MP4, WEBM
                    </p>
                </div>

                {/* Gallery Preview Grid */}
                {media.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {media.map((item, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group">
                                {item.type === 'video' ? (
                                    <video src={item.url} preload="metadata" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={item.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeMedia(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Upload, Plus, Edit, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
    id: number;
    title: string;
    title_nl?: string;
    title_fr?: string;
    description: string;
    description_nl?: string;
    description_fr?: string;
    content_en?: string;
    content_nl?: string;
    content_fr?: string;
    image_url: string;
    media?: { type: 'image' | 'video', path: string }[];
    created_at: string;
}

export default function OurWorkAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const { toast } = useToast();

    // Form states
    const [activeTab, setActiveTab] = useState("en");

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/get_projects.php");
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);
        if (editingProject) {
            formData.append("id", editingProject.id.toString());
        }

        try {
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => {
                    formData.append("media[]", file);
                });
            }

            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/upload_project.php", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload project");
            }

            toast({
                title: "Success",
                description: editingProject ? "Project updated successfully" : "Project uploaded successfully",
            });

            // Reset form
            (e.target as HTMLFormElement).reset();
            setEditingProject(null);
            setSelectedFiles([]);
            setPreviewUrls([]);
            fetchProjects();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to upload project",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/delete_project.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setProjects(projects.filter((p) => p.id !== id));
                toast({
                    title: "Success",
                    description: "Project deleted successfully",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete project",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
        setSelectedFiles([]);
        setPreviewUrls([]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageFiles = files.filter(f => f.type.startsWith('image/'));
            const videoFiles = files.filter(f => f.type.startsWith('video/'));

            if (imageFiles.length > 10) {
                toast({
                    title: "Error",
                    description: "Maximum 10 images allowed",
                    variant: "destructive",
                });
                return;
            }
            if (videoFiles.length > 5) {
                toast({
                    title: "Error",
                    description: "Maximum 5 videos allowed",
                    variant: "destructive",
                });
                return;
            }
            setSelectedFiles(files);

            // Create preview URLs
            const urls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

        try {
            const response = await fetch("/api/upload_content_image.php", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                navigator.clipboard.writeText(`![Image](${data.url})`);
                toast({
                    title: "Image Uploaded",
                    description: "Image URL copied to clipboard! Paste it in the content area.",
                });
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload content image",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Our Work Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Form */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
                        {editingProject && (
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                <X className="w-4 h-4 mr-2" />
                                Cancel Edit
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="en">English</TabsTrigger>
                                    <TabsTrigger value="nl">Dutch</TabsTrigger>
                                    <TabsTrigger value="fr">French</TabsTrigger>
                                </TabsList>

                                <div className="mt-4 space-y-4">
                                    {/* English Fields */}
                                    <TabsContent value="en" className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Project Title (EN)</label>
                                            <Input
                                                name="title"
                                                required
                                                defaultValue={editingProject?.title}
                                                placeholder="e.g. Website Redesign"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Short Description (EN)</label>
                                            <Textarea
                                                name="description"
                                                defaultValue={editingProject?.description}
                                                placeholder="Brief description for the card..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Full Content (EN) - Markdown Supported</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="content-image-en"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleContentImageUpload}
                                                    />
                                                    <label
                                                        htmlFor="content-image-en"
                                                        className="cursor-pointer text-xs flex items-center text-primary-500 hover:text-primary-600"
                                                    >
                                                        <ImageIcon className="w-3 h-3 mr-1" />
                                                        Upload Image for Content
                                                    </label>
                                                </div>
                                            </div>
                                            <Textarea
                                                name="content_en"
                                                defaultValue={editingProject?.content_en}
                                                placeholder="# Case Study Title\n\n## The Problem\n..."
                                                className="min-h-[300px] font-mono text-sm"
                                            />
                                        </div>
                                    </TabsContent>

                                    {/* Dutch Fields */}
                                    <TabsContent value="nl" className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Project Title (NL)</label>
                                            <Input
                                                name="title_nl"
                                                defaultValue={editingProject?.title_nl}
                                                placeholder="e.g. Website Herontwerp"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Short Description (NL)</label>
                                            <Textarea
                                                name="description_nl"
                                                defaultValue={editingProject?.description_nl}
                                                placeholder="Korte beschrijving..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Full Content (NL) - Markdown Supported</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="content-image-nl"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleContentImageUpload}
                                                    />
                                                    <label
                                                        htmlFor="content-image-nl"
                                                        className="cursor-pointer text-xs flex items-center text-primary-500 hover:text-primary-600"
                                                    >
                                                        <ImageIcon className="w-3 h-3 mr-1" />
                                                        Upload Image for Content
                                                    </label>
                                                </div>
                                            </div>
                                            <Textarea
                                                name="content_nl"
                                                defaultValue={editingProject?.content_nl}
                                                placeholder="# Case Study Titel\n\n## Het Probleem\n..."
                                                className="min-h-[300px] font-mono text-sm"
                                            />
                                        </div>
                                    </TabsContent>

                                    {/* French Fields */}
                                    <TabsContent value="fr" className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Project Title (FR)</label>
                                            <Input
                                                name="title_fr"
                                                defaultValue={editingProject?.title_fr}
                                                placeholder="e.g. Refonte de Site Web"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Short Description (FR)</label>
                                            <Textarea
                                                name="description_fr"
                                                defaultValue={editingProject?.description_fr}
                                                placeholder="Brève description..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Full Content (FR) - Markdown Supported</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="content-image-fr"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleContentImageUpload}
                                                    />
                                                    <label
                                                        htmlFor="content-image-fr"
                                                        className="cursor-pointer text-xs flex items-center text-primary-500 hover:text-primary-600"
                                                    >
                                                        <ImageIcon className="w-3 h-3 mr-1" />
                                                        Upload Image for Content
                                                    </label>
                                                </div>
                                            </div>
                                            <Textarea
                                                name="content_fr"
                                                defaultValue={editingProject?.content_fr}
                                                placeholder="# Titre de l'Étude de Cas\n\n## Le Problème\n..."
                                                className="min-h-[300px] font-mono text-sm"
                                            />
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>

                            <div className="space-y-4 pt-4 border-t">
                                <label className="text-sm font-medium">Project Media (Images: Max 10, Videos: Max 5)</label>

                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer relative">
                                    {/* Removed name="media[]" to prevent auto-capture by FormData, we handle manually */}
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileSelect}
                                    />
                                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        Click to upload NEW files (replaces selection)
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        JPG, PNG, WEBP, MP4, WEBM
                                    </p>
                                </div>

                                {/* Preview Grid (New Uploads) */}
                                {previewUrls.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-green-600">New files to upload:</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {previewUrls.map((url, index) => (
                                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                                                    {selectedFiles[index]?.type.startsWith('video') ? (
                                                        <video src={url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Existing Media Grid (Only when editing) */}
                                {editingProject && editingProject.media && editingProject.media.length > 0 && (
                                    <div className="space-y-2 mt-4">
                                        <p className="text-xs font-semibold text-gray-500">Existing Media:</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {editingProject.media.map((item, index) => (
                                                <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden border group">
                                                    {item.type === 'video' ? (
                                                        <video src={item.path} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={item.path} alt={`Existing ${index}`} className="w-full h-full object-cover" />
                                                    )}
                                                    {/* We could add delete functionality here later */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={uploading}>
                                {uploading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    editingProject ? <Edit className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />
                                )}
                                {editingProject ? "Update Project" : "Add Project"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Projects List */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Existing Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No projects found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`group relative border rounded-lg overflow-hidden bg-card transition-all ${editingProject?.id === project.id ? 'ring-2 ring-primary-500' : ''}`}
                                    >
                                        <div className="aspect-video relative">
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleEdit(project)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold truncate text-sm">{project.title}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

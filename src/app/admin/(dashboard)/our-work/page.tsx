"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Upload, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
}

export default function OurWorkAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

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

        try {
            const response = await fetch("/api/upload_project.php", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload project");
            }

            toast({
                title: "Success",
                description: "Project uploaded successfully",
            });

            // Reset form
            (e.target as HTMLFormElement).reset();
            fetchProjects();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload project",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const response = await fetch("/api/delete_project.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Our Work Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Add New Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Title</label>
                                <Input name="title" required placeholder="e.g. Website Redesign" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    name="description"
                                    placeholder="Brief description of the project..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Image</label>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        JPG, PNG, WEBP up to 5MB
                                    </p>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={uploading}>
                                {uploading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Plus className="w-4 h-4 mr-2" />
                                )}
                                Add Project
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Projects List */}
                <Card className="lg:col-span-2">
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
                                No projects found. Add one to get started.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="group relative border rounded-lg overflow-hidden bg-card"
                                    >
                                        <div className="aspect-video relative">
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold truncate">{project.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
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

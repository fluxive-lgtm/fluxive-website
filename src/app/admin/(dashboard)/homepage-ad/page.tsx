"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, MonitorPlay, CheckCircle2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AdSettings {
    ad_media_url: string | null;
    ad_media_type: 'image' | 'video';
    ad_title?: string;
}

export default function HomepageAdAdminPage() {
    const [settings, setSettings] = useState<AdSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [adTitleInput, setAdTitleInput] = useState("Featured Update");
    const [savingTitle, setSavingTitle] = useState(false);
    const { toast } = useToast();

    const fetchAd = async () => {
        try {
            const response = await fetch("/api/get_homepage_ad.php");
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
                if (data.ad_title) {
                    setAdTitleInput(data.ad_title);
                }
            }
        } catch (error) {
            console.error("Failed to fetch ad settings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAd();
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            toast({
                title: "Invalid File Type",
                description: "Only images (JPG, PNG) and videos (MP4, WEBM) are supported.",
                variant: "destructive",
            });
            return;
        }

        const maxSize = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
        if (file.size > maxSize) {
            toast({
                title: "File Too Large",
                description: `Max size is ${isImage ? '10MB for images' : '100MB for videos'}.`,
                variant: "destructive",
            });
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/upload_homepage_ad.php", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload ad");
            }

            toast({
                title: "Ad Uploaded Successfully!",
                description: "The homepage hero section has been updated.",
            });

            setSelectedFile(null);
            setPreviewUrl(null);
            fetchAd();
        } catch (error) {
            toast({
                title: "Upload Failed",
                description: error instanceof Error ? error.message : "Network error occurred.",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleTitleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSavingTitle(true);
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/update_homepage_ad_title.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ad_title: adTitleInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update title");
            }

            toast({
                title: "Headline Updated!",
                description: "The homepage ad headline has been updated.",
            });

            fetchAd();
        } catch (error) {
            toast({
                title: "Update Failed",
                description: error instanceof Error ? error.message : "Network error occurred.",
                variant: "destructive",
            });
        } finally {
            setSavingTitle(false);
        }
    };

    const handleDeleteAd = async () => {
        if (!confirm("Are you sure you want to remove the currently running ad?")) return;

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/delete_homepage_ad.php", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete ad");
            }

            toast({
                title: "Ad Removed",
                description: "The homepage hero ad slot is now empty.",
            });

            fetchAd();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Network error occurred.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                    <MonitorPlay className="w-8 h-8 text-primary-500" />
                    Homepage Ad Manager
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    {/* Title Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ad Headline</CardTitle>
                            <CardDescription>Update the small text banner displayed above the media box.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleTitleSubmit} className="flex gap-4">
                                <Input
                                    value={adTitleInput}
                                    onChange={(e) => setAdTitleInput(e.target.value)}
                                    placeholder="Featured Update"
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={savingTitle} className="bg-primary-600 hover:bg-primary-700">
                                    {savingTitle ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Headline"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Upload Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload New Ad</CardTitle>
                            <CardDescription>Replace the current homepage video/image. Videos autoplay automatically.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer relative group">
                                    <input
                                        type="file"
                                        accept="image/*,video/mp4,video/webm"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleFileSelect}
                                    />
                                    <div className="pointer-events-none flex flex-col items-center justify-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-primary-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                                                {selectedFile ? selectedFile.name : "Drag & Drop or Click to Browse"}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Videos: MP4, WEBM (Max 100MB)<br />
                                                Images: JPG, PNG (Max 10MB)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {previewUrl && (
                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold flex items-center text-green-600">
                                            <CheckCircle2 className="w-4 h-4 mr-1" />
                                            Ready to upload:
                                        </p>
                                        <div className="relative aspect-video rounded-xl overflow-hidden border bg-black shadow-lg">
                                            {selectedFile?.type.startsWith('video') ? (
                                                <video src={previewUrl} className="w-full h-full object-cover" controls muted />
                                            ) : (
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-lg font-bold bg-primary-600 hover:bg-primary-700"
                                    disabled={uploading || !selectedFile}
                                >
                                    {uploading ? (
                                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading Large File...</>
                                    ) : (
                                        "Save & Publish to Homepage"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Ad Preview */}
                <Card className="bg-gray-50/50 dark:bg-gray-900/50">
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <CardTitle>Currently Running Ad</CardTitle>
                            <CardDescription>This is what users see in the right-hand Hero section.</CardDescription>
                        </div>
                        {settings?.ad_media_url && (
                            <Button variant="destructive" size="sm" onClick={handleDeleteAd}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Ad
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                            </div>
                        ) : !settings?.ad_media_url ? (
                            <div className="aspect-video rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 bg-white dark:bg-black">
                                <MonitorPlay className="w-12 h-12 mb-3 opacity-20" />
                                <p>No ad is currently live.</p>
                            </div>
                        ) : (
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border bg-black group">
                                {settings.ad_media_type === 'video' ? (
                                    <video
                                        src={settings.ad_media_url}
                                        className="w-full h-full object-cover"
                                        autoPlay loop muted playsInline controls
                                    />
                                ) : (
                                    <img
                                        src={settings.ad_media_url}
                                        alt="Current Ad"
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                {/* Inner Preview Headline Overlay */}
                                <div className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 py-2 px-3 flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-widest text-white uppercase flex items-center gap-1">
                                        <MonitorPlay className="w-3 h-3 text-primary-400" />
                                        {settings.ad_title || "Featured Update"}
                                    </span>
                                </div>
                                <div className="absolute top-10 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Now
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

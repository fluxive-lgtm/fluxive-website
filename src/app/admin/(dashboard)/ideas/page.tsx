"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lightbulb, Trash2, Mail, Building2, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Idea {
    id: number;
    idea: string;
    business_name: string | null;
    email: string | null;
    status: string;
    ip_address: string;
    created_at: string;
}

export default function IdeasAdminPage() {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const { toast } = useToast();

    const fetchIdeas = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/get_ideas.php", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.ok) {
                    setIdeas(data.ideas);
                }
            }
        } catch (error) {
            console.error("Failed to fetch ideas", error);
            toast({
                title: "Error",
                description: "Failed to load ideas from the server.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to permanently delete this idea submission?")) return;

        setDeletingId(id);
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

            const response = await fetch("/api/delete_idea.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete idea");
            }

            toast({
                title: "Idea Deleted",
                description: "The submission has been removed.",
            });

            // Update local state instead of doing a full refetch for smoother UI
            setIdeas(prev => prev.filter(idea => idea.id !== id));
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Network error occurred.",
                variant: "destructive",
            });
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                    <Lightbulb className="w-8 h-8 text-primary-500" />
                    Submitted Ideas
                </h1>
            </div>

            {ideas.length === 0 ? (
                <Card className="bg-gray-50/50 dark:bg-gray-900/50 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <Lightbulb className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">No ideas submitted yet.</p>
                        <p className="text-sm">When users submit ideas via the homepage, they will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((item) => (
                        <Card key={item.id} className="flex flex-col group relative overflow-hidden transition-shadow hover:shadow-xl">
                            <CardHeader className="bg-gray-50 dark:bg-gray-900/50 pb-4 border-b">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity -mt-2 -mr-2"
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                                <div className="space-y-2 relative z-10">
                                    {item.business_name && (
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Building2 className="w-4 h-4 text-primary-500" />
                                            {item.business_name}
                                        </div>
                                    )}
                                    {item.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <a href={`mailto:${item.email}`} className="hover:underline hover:text-primary-500">{item.email}</a>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 flex-grow">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap whitespace-break-spaces text-gray-700 dark:text-gray-200">
                                    {item.idea}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

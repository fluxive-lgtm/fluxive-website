"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, Star, Loader2, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface Review {
    id: number;
    company_name: string;
    review_text: string;
    rating: number;
    is_approved: number;
    created_at: string;
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    const fetchReviews = async () => {
        try {
            // Fetch all reviews (approved_only=false)
            const response = await fetch("/api/get_reviews.php?approved_only=false");
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleApprove = async (id: number) => {
        setProcessingId(id);

        // Get token from cookie
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1];

        if (!token) {
            alert("Session expired. Please log in again.");
            window.location.href = "/admin/login";
            setProcessingId(null);
            return;
        }

        try {
            const response = await fetch("/api/approve_review.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                // Update local state
                setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: 1 } : r));
            } else {
                if (response.status === 401) {
                    alert("Session expired. Please log in again.");
                    window.location.href = "/admin/login";
                } else {
                    console.error("Failed to approve review: Server returned " + response.status);
                }
            }
        } catch (error) {
            console.error("Failed to approve review", error);
        } finally {
            setProcessingId(null);
        }
    };

    const handleRepost = async (review: Review) => {
        // Check for duplicates
        const isDuplicate = reviews.some(r =>
            r.is_approved === 1 &&
            r.id !== review.id &&
            r.review_text === review.review_text &&
            r.company_name === review.company_name
        );

        if (isDuplicate) {
            alert("This review is already posted on the website.");
            return;
        }

        // Proceed to approve
        await handleApprove(review.id);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        setProcessingId(id);

        // Get token from cookie
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1];

        if (!token) {
            alert("Session expired. Please log in again.");
            window.location.href = "/admin/login";
            setProcessingId(null);
            return;
        }

        try {
            const response = await fetch("/api/delete_review.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                // Remove from local state
                setReviews(reviews.filter(r => r.id !== id));
            } else {
                if (response.status === 401) {
                    alert("Session expired. Please log in again.");
                    window.location.href = "/admin/login";
                } else {
                    console.error("Failed to delete review: Server returned " + response.status);
                }
            }
        } catch (error) {
            console.error("Failed to delete review", error);
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-display">Reviews Management</h1>
                <Badge variant="outline" className="text-lg px-4 py-1">
                    Total: {reviews.length}
                </Badge>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="w-[40%]">Review</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No reviews found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            reviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {format(new Date(review.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="font-medium">{review.company_name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold">{review.rating}</span>
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-md truncate" title={review.review_text}>
                                        {review.review_text}
                                    </TableCell>
                                    <TableCell>
                                        {review.is_approved ? (
                                            <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30">
                                                Pending
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {!review.is_approved && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleApprove(review.id)}
                                                        disabled={processingId === review.id}
                                                        className="bg-green-500 hover:bg-green-600 text-white"
                                                        title="Approve"
                                                    >
                                                        {processingId === review.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Check className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleRepost(review)}
                                                        disabled={processingId === review.id}
                                                        className="border-green-500 text-green-500 hover:bg-green-50"
                                                        title="Repost (Check Duplicates)"
                                                    >
                                                        {processingId === review.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <RefreshCw className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(review.id)}
                                                disabled={processingId === review.id}
                                            >
                                                {processingId === review.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

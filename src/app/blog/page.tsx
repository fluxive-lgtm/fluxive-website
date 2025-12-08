"use client"

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";
import BlogHero from "@/components/blog/BlogHero";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import BlogList from "@/components/blog/BlogList";
import { getPosts, BlogPost } from "@/lib/blog";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const context = useLanguage();
  const language = context?.language || "en";

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getPosts(language, true);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  return (
    <main className="relative min-h-screen overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      <BlogHero searchQuery={searchQuery} onSearch={setSearchQuery} />

      <section className="py-12 px-4 relative z-10">
        {isLoading ? (
          <div className="container mx-auto text-center">Loading posts...</div>
        ) : (
          <BlogList initialPosts={posts} searchQuery={searchQuery} />
        )}
      </section>

      <NewsletterSignup />

      <Footer />
      <FloatingSocial />
      <FloatingWifiSupport />
    </main>
  );
}

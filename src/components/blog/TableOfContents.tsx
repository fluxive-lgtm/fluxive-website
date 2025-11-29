"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }))
            .filter((elem) => elem.id); // Only include headings with IDs

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -40% 0px" }
        );

        elements.forEach((elem) => {
            const el = document.getElementById(elem.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="sticky top-32 hidden lg:block">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-500">Table of Contents</h4>
            <nav className="space-y-1 border-l border-gray-200 dark:border-gray-800">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "block pl-4 py-1 text-sm transition-colors border-l-2 -ml-[2px]",
                            activeId === heading.id
                                ? "border-primary-500 text-primary-600 font-medium"
                                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                        style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "1rem" }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                            setActiveId(heading.id);
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}

"use client";

import { blogCategories, BlogCategory } from "@/data/blogData";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    activeCategory: BlogCategory;
    onSelectCategory: (category: BlogCategory) => void;
}

export default function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {blogCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-primary-500 text-white shadow-md transform scale-105"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
}

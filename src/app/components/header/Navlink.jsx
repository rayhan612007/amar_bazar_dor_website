"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ categories = [] }) {
    const pathname = usePathname();

    return (
        <div className="sticky top-0 z-40 border-y border-gray-200 bg-white/90 py-2 backdrop-blur-md">
            <div className="container mx-auto flex items-center gap-2 overflow-x-auto scroll-smooth px-4 no-scrollbar">
                {categories.map((item) => {
                    const itemPath = `/category/${item.slug}`;

                    const isActive =
                        pathname === itemPath ||
                        pathname.startsWith(`${itemPath}/`);

                    return (
                        <Link
                            key={item.id || item.slug}
                            href={itemPath}
                            aria-current={isActive ? "page" : undefined}
                            className={`btn btn-sm shrink-0 flex-nowrap rounded-lg border-none px-3 text-xs font-semibold transition-all duration-200 ${
                                isActive
                                    ? "bg-[#008744] text-white shadow-sm"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <span className="text-base">
                                {item.icon || item.categoryIcon || "📦"}
                            </span>
                            <span>{item.nameBn}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
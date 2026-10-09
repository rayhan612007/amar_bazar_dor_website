import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import Navlog from "./Navlog";
import Navlink from "./Navlink";
import Marquee from "./Marquee";

// Fetch categories on the server
async function CategoriesWrapper() {
    try {
        const response = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/categories",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        const categories = Array.isArray(data)
            ? data
            : data.categories || data.data || [];

        return <Navlink categories={categories} />;
    } catch (error) {
        console.error("Error fetching categories:", error);

        return <Navlink categories={[]} />;
    }
}

// Navbar component
const Navbar = async () => {
    await connection();

    const today = new Date().toLocaleDateString("bn-BD", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="border-b border-base-200 bg-base-100 shadow-sm">
            {/* Top Bar */}
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Brand Logo & Name */}
                <Link
                    href="/"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর লোগো"
                            width={28}
                            height={28}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-base-content md:text-2xl">
                            বাজার{" "}
                            <span className="text-emerald-600">
                                দর
                            </span>
                        </h1>

                        <p className="hidden text-xs text-base-content/60 md:block">
                            {today}
                        </p>
                    </div>
                </Link>

                {/* Authentication */}
                <Navlog />
            </div>

            {/* Categories Navigation */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center gap-2 border-y border-base-300 bg-base-200/60 p-3">
                        <span className="loading loading-dots loading-sm text-emerald-600" />
                        <span className="text-sm text-base-content/60">
                            ক্যাটাগরি লোড হচ্ছে...
                        </span>
                    </div>
                }
            >
                <CategoriesWrapper />
            </Suspense>

            {/* Price Ticker */}
            <Marquee />
        </header>
    );
};

export default Navbar;

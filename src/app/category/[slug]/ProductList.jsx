"use client";

import ProductCard from "@/app/all_Product/ProductCard";
import { useState } from "react";

export default function ProductList({ category, initialProducts = [] }) {
    const [sort, setSort] = useState("default");

    const sortedProducts = [...initialProducts].sort((a, b) => {
        const priceA = Number(a?.today) || 0;
        const priceB = Number(b?.today) || 0;

        if (sort === "low") {
            return priceA - priceB;
        }

        if (sort === "high") {
            return priceB - priceA;
        }

        return 0;
    });

    const productCountText = initialProducts.length.toLocaleString("bn-BD");

    const categoryName =
        category?.nameBn ||
        category?.category?.nameBn ||
        initialProducts[0]?.categoryNameBn ||
        "পণ্য তালিকা";

    const categoryIcon =
        category?.icon ||
        category?.categoryIcon ||
        initialProducts[0]?.categoryIcon ||
        "📦";

    return (
        <main className="min-h-screen bg-[#f4f8f4] px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Category Header Card */}
                <div className="mb-6 flex items-center gap-4 rounded-3xl border border-[#dce5df] bg-white p-6 shadow-xs sm:p-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e3f4eb] text-3xl">
                        {categoryIcon}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {categoryName}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            মোট {productCountText}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Subheader: Count + Sort Dropdown */}
                <div className="mb-6 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-700">
                        মোট {productCountText}টি পণ্য দেখানো হচ্ছে
                    </p>

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="product-sort"
                            className="text-sm font-medium text-gray-600"
                        >
                            সাজান
                        </label>

                        <select
                            id="product-sort"
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-600"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low">কম দাম</option>
                            <option value="high">বেশি দাম</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </main>
    );
}
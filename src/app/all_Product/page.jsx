import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import React from "react";
import { connection } from "next/server";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";

const AllProductpage = async () => {
    await connection();

    let products = [];
    try {
        const response = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            next: { revalidate: 60 }
        });
        if (response.ok) {
            const data = await response.json();
            products = Array.isArray(data) ? data : [];
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    const uppriceproduct = products.filter((item) => item?.change?.dir === "up");
    const downpriceproduct = products.filter((item) => item?.change?.dir === "down");

    const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    });

    return (
        <main className="min-h-screen bg-[#f4f8f4] px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Hero Header */}
                <section className="mb-8">
                    <div className="overflow-hidden rounded-[28px] border border-[#dce5df] bg-[#fbfdfc]">
                        <div className="flex min-h-95 items-center justify-between px-6 py-8 md:px-12 lg:px-16">
                            {/* Left Content */}
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex rounded-full bg-[#e3f4eb] px-4 py-1.5">
                                    <p className="text-sm font-medium text-[#008b4b]">
                                        {today}
                                    </p>
                                </div>

                                <h1 className="font-(--font-noto-serif-bengali) text-3xl leading-tight text-[#101914] sm:text-4xl md:text-5xl lg:text-[52px]">
                                    আজকের বাজারের দাম এক নজরে
                                </h1>

                                <p className="mt-4 font-(--font-noto-serif-bengali) text-sm leading-6 text-[#52605a] sm:text-base md:text-lg">
                                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                                    বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তনের এক নজরায়।
                                </p>

                                <Link
                                    href="#সব-পণ্য"
                                    className="btn mt-6 border-0 bg-[#008f49] px-6 text-white shadow-md hover:bg-[#00783e]"
                                >
                                    সব পণ্য দেখুন
                                </Link>
                            </div>

                            {/* Right Illustration */}
                            <div className="hidden shrink-0 lg:block">
                                <Image
                                    src="/bazar-hero.png"
                                    alt="ফলের ঝুড়ি"
                                    width={330}
                                    height={280}
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Price Increased Section */}
                {uppriceproduct.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-4 flex items-center gap-1 text-2xl font-bold text-gray-900">
                            <GoTriangleUp className="text-3xl text-red-600" />
                            আজ দাম বেড়েছে
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {uppriceproduct.slice(0, 6).map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Price Decreased Section */}
                {downpriceproduct.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-4 flex items-center gap-1 text-2xl font-bold text-gray-900">
                            <GoTriangleDown className="text-3xl text-green-600" />
                            আজ দাম কমেছে
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {downpriceproduct.slice(0, 6).map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Products Section Header */}
                <div id="সব-পণ্য" className="mb-6 flex scroll-mt-6 items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            সব পণ্য
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">
                            সাজান
                        </span>
                        <select
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                            defaultValue="default"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low">কম দাম</option>
                            <option value="high">বেশি দাম</option>
                        </select>
                    </div>
                </div>

                {/* All Products Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AllProductpage;
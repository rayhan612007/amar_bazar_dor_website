import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { connection } from "next/server";
import ProductCard from "./ProductCard";
import AllProductsGrid from "./AllProductsGrid";
import Link from "next/link";
import Image from "next/image";

const AllProductpage = async () => {
    await connection();

    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    const products = data;

    const uppriceproduct = products
        .filter((item) => item?.change?.dir === "up")
        .sort((a, b) => (b?.change?.pct ?? 0) - (a?.change?.pct ?? 0))
        .slice(0, 6);

    const downpriceproduct = products
        .filter((item) => item?.change?.dir === "down")
        .sort((b, a) => (b?.change?.pct ?? 0) - (a?.change?.pct ?? 0))
        .slice(0, 6);
    const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return (
        <main className="min-h-screen bg-[#f4f8f4] px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Hero Header */}
                <section className="mb-8">
                    <div className="overflow-hidden rounded-[28px] border border-[#dce5df] bg-[#fbfdfc]">
                        <div className="flex min-h-95 items-center justify-between px-6 py-8 md:px-12 lg:px-16">
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex rounded-full bg-[#e3f4eb] px-4 py-1.5">
                                    <p className="text-sm font-medium text-[#008b4b]">
                                        {today}
                                    </p>
                                </div>

                                <h1 className="font-(--font-noto-serif-bengali) max-w-120 text-xl leading-tight font-semibold text-[#101914] sm:text-2xl md:text-3xl lg:text-4xl">
                                    আজকের বাজারের দাম এক নজরে
                                </h1>

                                <p className="mt-4 font-(--font-noto-serif-bengali) text-sm leading-6 text-[#52605a] sm:text-base md:text-md">
                                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও
                                    মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
                                    সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তনের
                                    এক নজরায়।
                                </p>

                                <Link
                                    href="#সব-পণ্য"
                                    className="btn mt-6 border-0 bg-[#008f49] px-6 text-white shadow-md hover:bg-[#00783e]"
                                >
                                    সব পণ্য দেখুন
                                </Link>
                            </div>

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
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                />
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
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Products Section */}
                <section id="সব-পণ্য" className="scroll-mt-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            সব পণ্য
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            মোট {products.length.toLocaleString("bn-BD")}
                            টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>

                    <AllProductsGrid products={products} />
                </section>
            </div>
        </main>
    );


};

export default AllProductpage;

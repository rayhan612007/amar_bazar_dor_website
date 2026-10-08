import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { connection } from "next/server";
const Herosection = async () => {
    await connection();
    const today = new Date().toLocaleDateString("bn-bd", {
        dateStyle: "full"
    })
    return (
        <div>
            <section className="mx-auto max-w-7xl px-4 py-4">
                <div className="min-h-[380px] overflow-hidden rounded-[28px] border border-[#dce5df] bg-[#fbfdfc]">
                    <div className="flex min-h-[380px] items-center justify-between px-8 py-10 lg:px-16">

                        {/* Left Content */}
                        <div className="max-w-2xl">
                            {/* Date */}
                            <div className="mb-4 inline-flex rounded-full bg-[#e3f4eb] px-4 py-1.5">
                                <p className="text-sm font-medium text-[#008b4b]">
                                    {today}
                                </p>
                            </div>

                            {/* Heading */}
                            <h1 className="max-w-xl font-(--font-noto-serif-bengali) text-4xl font-bold leading-tight text-[#101914] md:text-5xl lg:text-[52px]">
                                আজকের বাজারের দাম এক নজরে
                            </h1>

                            {/* Description */}
                            <p className="mt-4 max-w-2xl font-(--font-noto-serif-bengali) text-base leading-7 text-[#52605a] md:text-lg">
                                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তনের এক নজরায়।
                            </p>

                            {/* Button */}
                            <Link
                                href="/all_Product"
                                className="btn mt-5 border-0 bg-[#008f49] px-6 text-white shadow-md hover:bg-[#00783e]"
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

        </div>
    );
};

export default Herosection;
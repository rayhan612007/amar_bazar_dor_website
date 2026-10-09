import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md rounded-2xl border border-[#dce5df] bg-[#fbfdfc] p-8 shadow-sm">
                {/* Emoji / Illustration */}
                <div className="mb-4 text-6xl">🔍</div>

                {/* 404 Heading */}
                <h1 className="font-(--font-noto-serif-bengali) text-5xl text-[#008f49]">
                    ৪০৪
                </h1>

                {/* Title */}
                <h2 className="mt-3 font-(--font-noto-serif-bengali) text-2xl text-[#101914]">
                    পৃষ্ঠাটি পাওয়া যায়নি
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[#52605a]">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই, সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল হতে পারে।
                </p>

                {/* CTA Button */}
                <div className="mt-6">
                    <Link
                        href="/"
                        className="btn border-0 bg-[#008f49] px-6 text-white shadow-md hover:bg-[#00783e]"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}
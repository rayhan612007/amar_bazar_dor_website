import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const PRODUCTS_URL = "https://api.api-store.workers.dev/api/bazardor/products";

// Fetch product by slug
async function getProductBySlug(slug) {
    try {
        const listRes = await fetch(PRODUCTS_URL, {
            cache: "no-store",
        });

        if (!listRes.ok) {
            throw new Error("Failed to load products list");
        }

        const data = await listRes.json();

        const products = Array.isArray(data)
            ? data
            : data.products || data.data || [];

        const matchedProduct = products.find(
            (item) => item.slug === slug
        );

        if (!matchedProduct) {
            return null;
        }

        const response = await fetch(
            `${PRODUCTS_URL}/${matchedProduct.id}`,
            { cache: "no-store" }
        );

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to load product details");
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        return null;
    }
}

// Convert numbers to Bengali
const toBnNum = (value) => {
    const number = Number(value);

    return Number.isFinite(number)
        ? number.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        })
        : "০";
};

// Get Bengali unit
const getUnitBn = (unit) => {
    const units = {
        kg: "কেজি",
        dozen: "ডজন",
        litre: "লিটার",
        liter: "লিটার",
        piece: "টি",
    };

    return units[unit] || unit || "একক";
};

// Dynamic metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "পণ্য পাওয়া যায়নি | বাজার দর",
        };
    }

    return {
        title: `${product.nameBn || product.name} এর আজকের দাম | বাজার দর`,
        description: `${product.nameBn || product.name}-এর আজকের দাম, সর্বনিম্ন দাম, সর্বোচ্চ দাম এবং গড় বাজারদর দেখুন।`,
    };
}

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const productName =
        product.nameBn || product.name || "অজানা পণ্য";

    const categoryName =
        product.categoryNameBn ||
        product.categoryName ||
        product.category ||
        "";

    const categorySlug =
        product.categorySlug || product.category || "";

    const unit =
        product.unitBn || getUnitBn(product.unit);

    const currentPrice = Number(product.today ?? 0);
    const changePct = Number(product.change?.pct ?? 0);

    const isPriceUp = changePct > 0;
    const isPriceDown = changePct < 0;

    const isImageUrl = (str) =>
        typeof str === "string" && (str.startsWith("/") || str.startsWith("http"));

    // Validate and prepare market prices
    const markets = Array.isArray(product.markets)
        ? product.markets
            .filter(
                (market) =>
                    market.min != null &&
                    market.max != null &&
                    Number.isFinite(Number(market.min)) &&
                    Number.isFinite(Number(market.max))
            )
            .map((market) => {
                const min = Number(market.min);
                const max = Number(market.max);

                return {
                    ...market,
                    min,
                    max,
                    average: (min + max) / 2,
                };
            })
        : [];

    // Lowest and highest market prices
    const lowestMarket = markets.length
        ? markets.reduce((lowest, market) =>
            market.min < lowest.min ? market : lowest
        )
        : null;

    const highestMarket = markets.length
        ? markets.reduce((highest, market) =>
            market.max > highest.max ? market : highest
        )
        : null;

    // Average of all market averages
    const average = markets.length
        ? markets.reduce(
            (sum, market) => sum + market.average,
            0
        ) / markets.length
        : 0;

    // Sort markets from low average to high average
    const sortedMarkets = [...markets].sort(
        (a, b) => a.average - b.average
    );

    return (
        <main className="min-h-screen bg-[#f4f8f4] px-4 py-8 md:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Breadcrumb Navigation */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
                >
                    <Link href="/" className="hover:text-emerald-700 hover:underline">
                        হোম
                    </Link>

                    <span>&gt;</span>

                    {categorySlug ? (
                        <Link
                            href={`/category/${categorySlug}`}
                            className="hover:text-emerald-700 hover:underline"
                        >
                            {categoryName}
                        </Link>
                    ) : (
                        <span>{categoryName}</span>
                    )}

                    <span>&gt;</span>

                    <span className="font-semibold text-gray-900">
                        {productName}
                    </span>
                </nav>

                {/* Product Detail Card */}
                <section className="flex flex-col gap-6 rounded-3xl border border-[#dce5df] bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#e3f4eb] text-3xl">
                            {isImageUrl(product.image) ? (
                                <Image
                                    src={product.image}
                                    alt={productName}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            ) : (
                                product.categoryIcon || product.image || "🛒"
                            )}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {productName}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                প্রতি {unit}
                                {categoryName ? ` · ${categoryName}` : ""}
                            </p>

                            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span
                                    className={`font-bold ${
                                        isPriceUp
                                            ? "text-red-600"
                                            : isPriceDown
                                            ? "text-green-600"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {isPriceUp
                                        ? "বেড়েছে"
                                        : isPriceDown
                                        ? "কমেছে"
                                        : "অপরিবর্তিত"}

                                    {(isPriceUp || isPriceDown) &&
                                        ` ${toBnNum(Math.abs(changePct))}%`}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-2xl border border-emerald-100 bg-[#fbfdfc] p-4 text-center sm:text-right">
                        <span className="block text-xs font-medium text-gray-500">
                            আজকের দাম
                        </span>

                        <p className="mt-1 text-3xl font-bold text-gray-900">
                            {toBnNum(currentPrice)}
                        </p>

                        <p className="text-xs font-semibold text-gray-600">
                            টাকা / {unit}
                        </p>
                    </div>
                </section>

                {/* Price Summary Grid */}
                <section className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                            <span className="text-xs font-medium text-gray-500">
                                সর্বনিম্ন দাম
                            </span>

                            <p className="mt-1 text-2xl font-bold text-green-600">
                                {lowestMarket
                                    ? toBnNum(lowestMarket.min)
                                    : "—"}{" "}
                                টাকা
                            </p>

                            <span className="mt-2 block truncate text-xs text-gray-500">
                                {lowestMarket?.market || "বাজারের তথ্য নেই"}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                            <span className="text-xs font-medium text-gray-500">
                                সর্বোচ্চ দাম
                            </span>

                            <p className="mt-1 text-2xl font-bold text-red-600">
                                {highestMarket
                                    ? toBnNum(highestMarket.max)
                                    : "—"}{" "}
                                টাকা
                            </p>

                            <span className="mt-2 block truncate text-xs text-gray-500">
                                {highestMarket?.market || "বাজারের তথ্য নেই"}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                            <span className="text-xs font-medium text-gray-500">
                                গড় দাম
                            </span>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {markets.length ? toBnNum(average) : "—"} টাকা
                            </p>

                            <span className="mt-2 block text-xs text-gray-500">
                                সব বাজারের গড় ({unit})
                            </span>
                        </div>
                    </div>
                </section>

                {/* Market-wise Table */}
                <section className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {sortedMarkets.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#e3f4eb] text-gray-800">
                                        <tr>
                                            <th className="px-4 py-3.5 font-semibold">
                                                বাজার
                                            </th>
                                            <th className="px-4 py-3.5 font-semibold">
                                                বিভাগ
                                            </th>
                                            <th className="px-4 py-3.5 text-right font-semibold">
                                                সর্বনিম্ন
                                            </th>
                                            <th className="px-4 py-3.5 text-right font-semibold">
                                                সর্বোচ্চ
                                            </th>
                                            <th className="px-4 py-3.5 text-right font-semibold">
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {sortedMarkets.map((market, index) => (
                                            <tr
                                                key={
                                                    market.id ??
                                                    `${market.market}-${market.division}-${index}`
                                                }
                                                className={
                                                    index % 2 === 1
                                                        ? "bg-[#fbfdfc]"
                                                        : "bg-white"
                                                }
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {market.market || "—"}
                                                </td>

                                                <td className="px-4 py-3 text-gray-600">
                                                    {market.division || "—"}
                                                </td>

                                                <td className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                                                    {toBnNum(market.min)} টাকা
                                                </td>

                                                <td className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                                                    {toBnNum(market.max)} টাকা
                                                </td>

                                                <td className="px-4 py-3 text-right font-bold text-emerald-700 whitespace-nowrap">
                                                    {toBnNum(market.average)} টাকা
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                            এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                        </div>
                    )}

                    {categorySlug && (
                        <div className="mt-6">
                            <Link
                                href={`/category/${categorySlug}`}
                                className="btn border-none bg-[#008744] text-white hover:bg-[#007038]"
                            >
                                <span>{product.categoryIcon || "📦"}</span>
                                <span>সব {categoryName} দেখুন</span>
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
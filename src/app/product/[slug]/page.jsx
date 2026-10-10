import Link from "next/link";
import { notFound } from "next/navigation";
import { FiMinus } from "react-icons/fi";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

// Fetch the product by its slug or ID.
async function getProductBySlug(slug) {
    try {
        const response = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products",
            { cache: "no-store" }
        );

        if (!response.ok) return null;

        const data = await response.json();

        const products = Array.isArray(data)
            ? data
            : data?.products || data?.data || [];

        const matchedProduct = products.find(
            (item) =>
                item.slug === slug ||
                String(item.id) === String(slug)
        );

        if (!matchedProduct) return null;

        // Fetch the full product details using its ID.
        const detailResponse = await fetch(
            `https://api.api-store.workers.dev/api/bazardor/products/${matchedProduct.id}`,
            { cache: "no-store" }
        );

        if (!detailResponse.ok) {
            return matchedProduct;
        }

        const detailData = await detailResponse.json();

        return detailData?.product || detailData?.data || detailData;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

// Format numbers in Bangla.
const toBnNum = (value) => {
    const number = Number(value);

    return value != null && value !== "" && Number.isFinite(number)
        ? number.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        })
        : "০";
};

// Translate units into Bangla.
const getUnitBn = (unit) => {
    const units = {
        kg: "কেজি",
        gram: "গ্রাম",
        g: "গ্রাম",
        dozen: "ডজন",
        litre: "লিটার",
        liter: "লিটার",
        ml: "মিলিলিটার",
        piece: "টি",
    };

    return units[unit] || unit || "একক";
};

// Dynamic SEO metadata.
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "পণ্য পাওয়া যায়নি | বাজার দর",
        };
    }

    const productName =
        product.nameBn || product.name || "পণ্য";

    return {
        title: `${productName} এর আজকের দাম | বাজার দর`,
        description: `${productName}-এর আজকের দাম, সর্বনিম্ন দাম, সর্বোচ্চ দাম এবং গড় বাজারদর দেখুন।`,
    };
}

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const productName =
        product.nameBn || product.name || "পণ্য";

    const categoryName =
        product.categoryNameBn || product.categoryName || "";

    const categorySlug = product.category || "";

    const unit = getUnitBn(product.unit);

    const currentPrice = Number(product.today ?? 0);
    const changePct = Number(product.change?.pct ?? 0);

    const isPriceUp = changePct > 0;
    const isPriceDown = changePct < 0;
    const direction =
        product.change.dir;

    const rawMarkets = Array.isArray(product.markets)
        ? product.markets
        : [];

    const markets = rawMarkets
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
        });

    // Find the lowest and highest market prices.
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

    // Calculate the average of all market averages.
    const average = markets.length
        ? markets.reduce(
            (sum, market) => sum + market.average,
            0
        ) / markets.length
        : 0;

    // Sort markets from lowest average price to highest.
    const sortedMarkets = [...markets].sort(
        (a, b) => a.average - b.average
    );

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* Breadcrumb navigation */}
            <nav
                aria-label="Breadcrumb"
                className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2"
            >
                <Link href="/" className="hover:underline">
                    হোম
                </Link>

                <span>&gt;</span>

                {categorySlug ? (
                    <Link
                        href={`/category/${categorySlug}`}
                        className="hover:underline"
                    >
                        {categoryName}
                    </Link>
                ) : (
                    <span>{categoryName}</span>
                )}

                <span>&gt;</span>

                <span className="font-semibold text-black">
                    {productName}
                </span>
            </nav>

            {/* Product detail card */}
            <section className="bg-white p-5 sm:p-6 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
                <div className="flex items-center gap-4 min-w-0">
                    {product.image && (
                        <span className="text-4xl bg-gray-200 p-5 border-0 rounded-2xl shrink-0">
                            <p>
                                {product.image}

                            </p>
                        </span>
                    )}

                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {productName}
                        </h1>

                        <p className="text-gray-500 text-xs">
                            প্রতি {unit}
                            {categoryName
                                ? ` · ${categoryName}`
                                : ""}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span
                                className={`font-bold ${isPriceUp
                                    ? "text-red-600"
                                    : isPriceDown
                                        ? "text-green-600"
                                        : "text-gray-600"
                                    }`}
                            >
                                {isPriceUp
                                    ? "বেড়েছে"
                                    : isPriceDown
                                        ? "কমেছে"
                                        : "অপরিবর্তিত"}

                                {(isPriceUp || isPriceDown) &&
                                    ` ${toBnNum(Math.abs(changePct))}%`}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-100 py-5 px-4 rounded-2xl text-center sm:text-right border-0 shrink-0">
                    <span className="text-xs text-center text-gray-500 block">
                        আজকের দাম
                    </span>

                    <p className="text-3xl text-center font-bold text-gray-900">
                        {toBnNum(currentPrice)}
                    </p>

                    <p className="font-semibold text-gray-600 text-xs">
                        টাকা / {unit}
                    </p>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium `}
                    >
                        {direction === "up" ? (
                            <GoTriangleUp className="text-2xl text-red-500" />
                        ) : direction === "down" ? (
                            <GoTriangleDown className="text-2xl text-emerald-600" />
                        ) : (
                            <FiMinus className="text-2xl text-gray-500" />
                        )}

                        <span>
                            {Math.abs(changePct).toLocaleString("bn-BD")}
                            %
                        </span>
                    </span>
                </div>
            </section>

            {/* Price summary */}
            <section className="mt-8">
                <h2 className="text-xl font-bold mb-4">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border">
                        <span className="text-xs text-gray-500">
                            সর্বনিম্ন দাম
                        </span>

                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {lowestMarket
                                ? toBnNum(lowestMarket.min)
                                : "—"}{" "}
                            টাকা
                        </p>

                        <span className="text-xs text-gray-500 mt-1 block">
                            <p>সবচেয়ে কম দামের বাজার</p>
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border">
                        <span className="text-xs text-gray-500">
                            সর্বোচ্চ দাম
                        </span>

                        <p className="text-2xl font-bold text-red-600 mt-1">
                            {highestMarket
                                ? toBnNum(highestMarket.max)
                                : "—"}{" "}
                            টাকা
                        </p>

                        <span className="text-xs text-gray-500 mt-1 block">
                            <p>সবচেয়ে বেশি দামের বাজার</p>
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border">
                        <span className="text-xs text-gray-500">
                            গড় দাম
                        </span>

                        <p className="text-2xl font-bold text-gray-800 mt-1">
                            {markets.length
                                ? toBnNum(average)
                                : "—"}{" "}
                            টাকা
                        </p>

                        <span className="text-xs text-gray-500 mt-1 block">
                            প্রতি {unit}-এর হিসাবে
                        </span>
                    </div>
                </div>
            </section>

            {/* Market-wise prices */}
            <section className="mt-8">
                <h2 className="text-lg font-bold mb-3">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                {sortedMarkets.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-700">
                                    <th className="px-3 py-3 text-left font-semibold">
                                        বাজার
                                    </th>

                                    <th className="px-3 py-3 text-left font-semibold">
                                        বিভাগ
                                    </th>

                                    <th className="px-3 py-3 text-right font-semibold">
                                        সর্বনিম্ন
                                    </th>

                                    <th className="px-3 py-3 text-right font-semibold">
                                        সর্বোচ্চ
                                    </th>

                                    <th className="px-3 py-3 text-right font-semibold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedMarkets.map((market, index) => (
                                    <tr
                                        key={
                                            market.id ??
                                            `${market.market}-${market.division}-${index}`
                                        }
                                        className={`border-b border-gray-200 last:border-0 ${index % 2 === 1
                                            ? "bg-[#f0f5f1]"
                                            : "bg-white"
                                            }`}
                                    >
                                        <td className="px-3 py-3">
                                            {market.market || "—"}
                                        </td>

                                        <td className="px-3 py-3">
                                            {market.division || "—"}
                                        </td>

                                        <td className="px-3 py-3 text-right whitespace-nowrap">
                                            {toBnNum(market.min)} টাকা
                                        </td>

                                        <td className="px-3 py-3 text-right whitespace-nowrap">
                                            {toBnNum(market.max)} টাকা
                                        </td>

                                        <td className="px-3 py-3 text-right font-medium whitespace-nowrap">
                                            {toBnNum(market.average)} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="rounded-lg border bg-white p-4 text-gray-500">
                        এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                    </p>
                )}

                {categorySlug && (
                    <Link
                        href={`/category/${categorySlug}`}
                        className="mt-4 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors w-fit"
                    >
                        <span>{product.categoryIcon}</span>
                        <span>সব {categoryName}</span>
                    </Link>
                )}
            </section>
        </div>
    );
}
import Link from "next/link";
import { FiArrowDown, FiArrowUp, FiMinus } from "react-icons/fi";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const ProductCard = ({ product }) => {
    const change = product?.change ?? {};

    const changeValue = Number(
        change.pct ?? product?.changePercent ?? 0
    );

    const direction =
        change.dir ||
        (changeValue > 0 ? "up" : changeValue < 0 ? "down" : "flat");


    const unitText = {
        kg: "কেজি",
        litre: "লিটার",
        piece: "পিস",
        dozen: "ডজন",
    }[product?.unit] || product?.unit || "কেজি";

    const price = Number(product?.today);


    return (
        <Link
            href={`/product/${product?.slug || product?.id}`}
            className="block h-full"
        >
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-green-500 hover:shadow-md">
                {/* Product top */}
                <div className="flex items-start gap-3">
                    {/* Product Icon / Image */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1f5f1] text-2xl">
                        <p>{product?.image || "[]"}</p>
                    </div>

                    {/* Product Name */}
                    <div className="min-w-0">
                        <h3 className="wrap-break-word text-base font-bold text-gray-900 sm:text-lg">
                            {product?.nameBn || "পণ্য"}
                        </h3>
                        <p className="text-xs text-gray-500 sm:text-sm">
                            প্রতি {unitText}
                        </p>
                    </div>
                </div>

                {/* Price Details */}
                <div className="mt-4">
                    <p className="text-xs text-gray-500">
                        আজকের দাম
                    </p>

                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-lg font-bold text-gray-900 sm:text-xl">
                            {Number.isFinite(price)
                                ? price.toLocaleString("bn-BD")
                                : "—"}{" "}
                            টাকা
                        </p>

                        {/* Price Change Badge */}
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium `}
                        >
                            {direction === "up" ? (
                                <GoTriangleUp className="text-2xl text-red-500" />
                            ) : direction === "down" ? (
                                <GoTriangleDown className="text-2xl text-emerald-600" />
                            ) : (
                                <FiMinus className="text-2xl text-gray-500" />
                            )}

                            <span>
                                {Math.abs(changeValue).toLocaleString("bn-BD")}
                                %
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
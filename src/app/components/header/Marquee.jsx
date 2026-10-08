import React from "react";
import Marquee from "react-fast-marquee";

const PriceMarquee = async () => {
    let products = [];

    try {
        const response = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        products = Array.isArray(data)
            ? data
            : data.products || data.data || [];
    } catch (error) {
        console.error("Failed to fetch marquee data:", error);
    }

    const getUnitText = (unit) => {
        switch (unit) {
            case "kg":
                return "কেজি";
            case "litre":
                return "লিটার";
            case "piece":
                return "পিস";
            case "dozen":
                return "ডজন";
            default:
                return unit || "কেজি";
        }
    };

    const toBanglaNumber = (value) => {
        if (value === null || value === undefined) return "";

        return Number(value).toLocaleString("bn-BD");
    };

    return (
        <div className="w-full border-y border-gray-200 bg-[#fbfbfa] py-2">
            <Marquee
                speed={150}
                pauseOnHover
                gradient={false}
            >
                {products.map((item, i) => {
                    const isUp = item.change?.dir === "up";

                    const changeValue =
                        item.change?.pct ?? item.changePercent ?? 0;

                    return (

                        <div
                            key={item.id || i}
                            className="flex items-center gap-2 whitespace-nowrap border-r border-gray-300 px-6 text-sm text-gray-800"
                        >
                            {/* Product Image */}
                            {item.categoryIcon}

                            {/* Product Name */}
                            <span className="font-semibold">
                                {item.nameBn}
                            </span>

                            {/* Price & Unit */}
                            <span>
                                {toBanglaNumber(item.today)} টাকা/
                                {getUnitText(item.unit)}
                            </span>

                            {/* Price Change */}
                            <span
                                className={`flex items-center gap-1 text-xs font-bold ${isUp ? "text-red-500" : "text-emerald-600"
                                    }`}
                            >
                                <span>{isUp ? "▲" : "▼"}</span>

                                <span>
                                    {Math.abs(Number(changeValue)).toLocaleString("bn-BD")}%
                                </span>
                            </span>
                        </div>

                    );
                })}
            </Marquee>
        </div>
    );
};

export default PriceMarquee;
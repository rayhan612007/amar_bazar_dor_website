import React from "react";
import Marquee from "react-fast-marquee";
import { FiMinus } from "react-icons/fi";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const PriceMarquee = async () => {
    let products = [];

    try {
        const response = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products",
            { cache: "no-store" }
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
        if (value === null || value === undefined || value === "") {
            return "";
        }

        return Number(value).toLocaleString("bn-BD");
    };

    return (
        <div className="w-full border-y border-gray-200 bg-[#fbfbfa] py-2">
            <Marquee speed={80} pauseOnHover gradient={false}>
                {products.map((item, index) => {
                    const changeValue = Number(
                        item.change?.pct ??
                        item.changePercent ??
                        0
                    );

                    const isUp =
                        item.change?.dir === "up" ||
                        (!item.change?.dir && changeValue > 0);

                    const isDown =
                        item.change?.dir === "down" ||
                        (!item.change?.dir && changeValue < 0);

                    const arrow = isUp
                        ? <GoTriangleUp className="text-2xl text-red-500" />
                        : isDown
                            ? <GoTriangleDown className="text-2xl text-emerald-600" />
                            : <FiMinus className="text-gray-500 text-2xl" />;
                    const parsent = isUp
                        ? "%"
                        : isDown
                            ? "%"
                            : "";

                    return (
                        <div
                            key={item.id ?? item.slug ?? index}
                            className="flex items-center gap-2 whitespace-nowrap border-r border-gray-300 px-6 text-sm text-gray-800"
                        >
                            {/* Category Icon */}
                            <span>{item.categoryIcon}</span>

                            {/* Product Name */}
                            <span className="font-semibold">
                                {item.nameBn}
                            </span>

                            {/* Current Price */}
                            <span>
                                {toBanglaNumber(item.today)} টাকা/
                                {getUnitText(item.unit)}
                            </span>

                            {/* Price Change */}
                            <span className="flex items-center gap-1 text-xs font-bold">
                                <span>{arrow}</span>
                                <span>
                                    {toBanglaNumber(Math.abs(changeValue))}
                                    {changeValue !== 0 ? "%" : ""}
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

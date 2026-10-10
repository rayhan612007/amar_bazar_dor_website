"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";

const AllProductsGrid = ({ products }) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
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

    return (
        <>
            <div className="mb-5 flex justify-end">
                <SortDropdown
                    sort={sort}
                    setSort={setSort}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    );

};

export default AllProductsGrid;

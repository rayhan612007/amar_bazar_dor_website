import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RxTriangleUp } from "react-icons/rx";
import React from "react";

import ProductCard from "./ProductCard";
import { BiDownArrow } from "react-icons/bi";
const AllProductpage = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data = await response.json();

    const products = data;
    const uppriceproduct = products.filter((item) => item.change.dir === "up");
    const downpriceproduct = products.filter((item) => item.change.dir === "down");


    return (
        <main className="min-h-screen bg-[#f4f8f4] px-4 py-6 md:px-8">

            {/* Header */}
            <div className="mx-auto max-w-7xl">
                {/* দাম বেড়েছে*/}
                <div>
                    <h1 className="flex mb-5 items-center text-2xl font-semibold"><GoTriangleUp className="text-red-700 text-3xl" />
                        আজ দাম বেড়েছে</h1>
                    <div className="grid grid-cols-3 gap-2">

                        {
                            uppriceproduct.slice(0, 6).map((item) => <ProductCard key={item.id} product={item} />)
                        }
                    </div>
                </div>
                {/* আজ দাম কমেছে */}
                <div className="mt-5">
                    <h1 className="flex items-center mb-5 text-2xl font-semibold"><GoTriangleDown className="text-green-700 text-3xl" />
                        আজ দাম কমেছে</h1>
                    <div className="grid grid-cols-3 gap-2">

                        {
                            downpriceproduct.slice(0, 6).map((item) => <ProductCard key={item.id} product={item} />)
                        }
                    </div>
                </div>


                <div className="mb-6 flex mt-5 items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            সব পণ্য
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                            সাজান
                        </span>

                        <select
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                            defaultValue="default"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low">কম দাম</option>
                            <option value="high">বেশি দাম</option>
                        </select>
                    </div>
                </div>


                {/* Products */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>
        </main>
    );
};




export default AllProductpage;
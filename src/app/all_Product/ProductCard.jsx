import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const ProductCard = ({ product }) => {

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-green-500">

            {/* Product top */}
            <div className="flex items-start gap-3">

                {/* Image */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1]">

                    <p>{product.image}</p>
                </div>


                {/* Name */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        {product.nameBn}
                    </h2>

                    <p className="text-sm text-gray-500">
                        প্রতি কেজি
                    </p>
                </div>

            </div>


            {/* Price */}
            <div className="mt-4">

                <p className="text-sm text-gray-500">
                    আজকের দাম
                </p>

                <div className="mt-1 flex items-center justify-between">

                    <p className="text-xl font-bold text-gray-900">
                        {product.today?.toLocaleString("bn-BD")} টাকা
                    </p>


                    {/* Price change */}
                    <span
                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${product.change.dir === "up"
                            ? "bg-red-50 text-red-500"
                            : product.change.dir === "down"
                                ? "bg-green-50 text-green-600 "
                                : "bg-gray-100 text-black"
                            }`}
                    >
                        {product.change.dir === "up" ? (
                            <FiArrowUp size={12} />
                        ) : product.change.dir === "down" ? (
                            <FiArrowDown size={12} />
                        ) : ""}

                        <span>
                            {product.change.dir === "flat" ? "—০.০" :
                                Math.abs(product.change.pct).toLocaleString("bn-BD")
                            }%
                        </span>
                    </span>

                </div>

            </div>

        </div >
    );
};
export default ProductCard;
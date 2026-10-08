import ProductCard from "@/app/all_Product/ProductCard";

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const response = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Product not found");
    }

    const product = await response.json();
    const productlength = product.length.toLocaleString("bn-BD")

    return (
        <div>
            {/* slug single item */}
            {
                product.slice(0, 1).map((item) => (
                    <div key={item.id} className="flex gap-5 mt-5 bg-gray-100 border rounded-4xl px-4 py-5">
                        <h1 className="text-4xl">{item.image}</h1>
                        <div>
                            <h2 className="text-2xl font-bold">{item.categoryNameBn}</h2>
                            <p>{productlength}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                        </div>
                    </div>

                ))
            }

            <div className="mb-6 flex mt-5 items-end container mx-auto justify-between">

                <h1>মোট {product.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</h1>
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
            <div className="grid grid-cols-3 gap-2">

                {
                    product.map((item) => <ProductCard key={item.id} product={item} />)
                }
            </div>
        </div>
    );
}
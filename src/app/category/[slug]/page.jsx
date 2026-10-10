import ProductList from "./ProductList";
import { notFound } from "next/navigation";


async function getCategory(slug) {
    const response = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`)
    return await response.json();
}

async function getProducts(slug) {
    const response = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
    return await response.json();
}



export default async function CategoryPage({ params }) {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategory(slug),
        getProducts(slug),
    ]);

    if (!category && products.length === 0) {
        notFound();
    }

    return <ProductList category={category} initialProducts={products} />;
}


export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const category = await getCategory(slug);

        if (!category) {
            return {
                title: "ক্যাটাগরি পাওয়া যায়নি | বাজার দর",
            };
        }

        const categoryName = category.nameBn || category.category?.nameBn;

        return {
            title: categoryName
                ? `${categoryName} এর আজকের দাম | বাজার দর`
                : "পণ্যের দাম | বাজার দর",
            description: categoryName
                ? `${categoryName} এর আজকের বাজার দর, সর্বনিম্ন ও সর্বোচ্চ দাম এবং মূল্য পরিবর্তন দেখুন।`
                : "বিভিন্ন পণ্যের আজকের বাজার দর দেখুন।",
        };
    } catch {
        return {
            title: "পণ্যের দাম | বাজার দর",
        };
    }
}
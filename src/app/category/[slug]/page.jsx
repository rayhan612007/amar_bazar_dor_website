import ProductList from "./ProductList";
import { notFound } from "next/navigation";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getCategory(slug) {
    try {
        const response = await fetch(
            `${API_URL}/categories/${encodeURIComponent(slug)}`,
            { cache: "no-store" }
        );

        if (!response.ok) return null;

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch category:", error);
        return null;
    }
}

async function getProducts(slug) {
    try {
        const response = await fetch(
            `${API_URL}/products?category=${encodeURIComponent(slug)}`,
            { cache: "no-store" }
        );

        if (!response.ok) return [];

        const data = await response.json();
        return Array.isArray(data) ? data : data.products || data.data || [];
    } catch (error) {
        console.error("Failed to fetch category products:", error);
        return [];
    }
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
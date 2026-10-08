// import Image from "next/image";
// import Navlink from "./Navlink";
// import Navlog from "./Navlog";
// import Link from "next/link";
// import Marquee from "./Marquee";
// import { Suspense } from "react";

// const Navbar = () => {
//     // const today = new Date().toLocaleDateString("bn-BD", { dateStyle: 'full' })
//     return (
//         <Suspense fallback="<p>loading..</p>" >
//             {/* top */}
//             <div className="container mx-auto my-5 flex justify-between">
//                 {/* left */}
//                 <Link href='/'>
//                     <div className="flex items-center gap-3">
//                         <div className="w-fit rounded-2xl border-0 bg-green-600 p-4">
//                             <Image
//                                 src="/logo-icon.png"
//                                 alt="bazardor_image"
//                                 width={30}
//                                 height={30}
//                             />
//                         </div>

//                         <div>
//                             <h1 className="text-2xl font-bold">বাজার দর</h1>
//                             {/* <p>{today}</p> */}
//                         </div>
//                     </div>
//                 </Link>

//                 {/* right */}
//                 <Navlog />

//             </div>

//             {/* bottom */}

//             <Navlink />
//             <Marquee />
//         </Suspense>
//     );
// };

// export default Navbar;
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Navlog from "./Navlog";
import Navlink from "./Navlink";
import Marquee from "./Marquee";

// Server wrapper component fetching categories safely
async function CategoriesWrapper() {
    try {
        const response = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        return <Navlink categories={categories} />;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return <Navlink categories={[]} />;
    }
}

const Navbar = async () => {
    await connection();
    const today = new Date()?.toLocaleDateString("bn-BD", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-base-100 shadow-sm border-b border-base-200">
            {/* Top Bar */}
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand Logo & Name */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর লোগো"
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-base-content">
                            বাজার <span className="text-emerald-600">দর</span>
                        </h1>
                        <p className="text-xs text-base-content/60 hidden md:block">
                            {today}
                        </p>
                    </div>
                </Link>

                {/* Right Action / Auth Buttons */}
                <Navlog />
            </div>

            {/* Categories Navigation Bar */}
            <Suspense fallback={
                <div className="flex gap-2 p-3 justify-center bg-base-200/60">
                    <span className="loading loading-dots loading-sm text-emerald-600"></span>
                </div>
            }>
                <CategoriesWrapper />
            </Suspense>

            {/* Ticker / Marquee */}
            <Marquee />
        </header>
    );
};

export default Navbar;
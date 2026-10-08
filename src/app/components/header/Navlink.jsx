// import Link from "next/link";
// import { Suspense } from "react";

// const Navlink = async () => {
//     const response = await fetch(
//         "https://api.api-store.workers.dev/api/bazardor/categories"
//     );

//     const data = await response.json();

//     return (
//         <Suspense fallback="<p>Loading...</p>">

//             <div className="flex container mx-auto gap-5">
//                 {data.map((item) => (
//                     <Link
//                         href={`/products/${item.slug}`}
//                         key={item.id}
//                         className="text-center"
//                     >
//                         <p> {item.icon}{item.nameBn}</p>

//                     </Link>
//                 ))}
//             </div>
//         </Suspense>
//     );
// };

// export default Navlink;


'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ categories = [] }) {
    const pathname = usePathname();

    return (
        <div className="bg-base-200/60 backdrop-blur-md border-y border-base-300 py-2 sticky top-0 z-40">
            <div className="container mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                {categories.map((item) => {
                    const itemPath = `/products/${item.slug}`;
                    const isActive = pathname === itemPath;

                    return (
                        <Link
                            key={item.id}
                            href={itemPath}
                            className={`btn btn-sm flex-nowrap shrink-0 transition-all duration-200 ${isActive
                                ? 'btn-emerald text-black font-bold shadow-md shadow-emerald-500/20 scale-[1.02]'
                                : 'btn-ghost hover:bg-base-300/60 text-base-content/80'
                                }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.nameBn}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
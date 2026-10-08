'use client'
import Link from 'next/link';
import React from 'react';

const Navlog = () => {
    return (
        <div>
            <div className="flex gap-5">
                <Link href='/sign-in'>
                    <button className="btn border-0 bg-white hover:bg-gray-400">
                        সাইন ইন
                    </button>
                </Link>

                <Link href="/sign-up">
                    <button className="btn bg-green-500 text-white hover:bg-green-700">
                        সাইন আপ
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navlog;

// 'use client';

// import Link from 'next/link';

// const Navlog = () => {
//     return (
//         <div className="flex items-center gap-3">
//             <Link href="/signinpage">
//                 <button className="btn btn-ghost btn-sm md:btn-md font-medium text-base-content/80 hover:bg-base-200">
//                     সাইন ইন
//                 </button>
//             </Link>

//             <Link href="/signuppage">
//                 <button className="btn btn-emerald btn-sm md:btn-md text-white shadow-sm hover:shadow-md">
//                     সাইন আপ
//                 </button>
//             </Link>
//         </div>
//     );
// };

// export default Navlog;
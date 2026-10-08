"use client";

import React from "react";

const SignUp = () => {
    return (
        <div className="min-h-screen bg-[#f1f7f2] px-4 py-10">
            <div className="mx-auto w-full max-w-md">
                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        নিচে আপনার সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <form className="space-y-3">
                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                নাম
                            </label>

                            <input
                                type="text"
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered h-9 w-full bg-white text-xs"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                ইমেইল
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="input input-bordered h-9 w-full bg-white text-xs"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                পাসওয়ার্ড
                            </label>

                            <input
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="input input-bordered h-9 w-full bg-white text-xs"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                type="password"
                                placeholder="আবার লিখুন"
                                className="input input-bordered h-9 w-full bg-white text-xs"
                            />
                        </div>

                        {/* Sign Up */}
                        <button
                            type="submit"
                            className="btn h-9 min-h-9 w-full border-0 bg-green-600 text-xs text-white hover:bg-green-700"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>

                        {/* Divider */}
                        <div className="divider my-2 text-[10px] text-gray-400">
                            অথবা
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                className="btn btn-outline h-8 min-h-8 bg-white text-[10px] font-normal"
                            >
                                <span className="text-sm">🌐</span>
                                Google দিয়ে চালিয়ে যান
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline h-8 min-h-8 bg-white text-[10px] font-normal"
                            >
                                <span className="text-sm">◉</span>
                                GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        {/* Login */}
                        <p className="pt-1 text-center text-[10px] text-gray-500">
                            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                            <a
                                href="/sign-in"
                                className="font-medium text-green-600 hover:underline"
                            >
                                সাইন ইন করুন
                            </a>
                        </p>
                    </form>
                </div>

                {/* Bottom text */}
                <p className="mt-4 text-center text-[10px] text-gray-400">
                    ✓ নিরাপদভাবে আপনার তথ্য সংরক্ষণ করা হয়
                </p>
            </div>
        </div>
    );
};

export default SignUp;
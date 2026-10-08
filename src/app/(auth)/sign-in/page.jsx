"use client";

import React from "react";

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-[#f2f7f3] px-4 py-10">
            <div className="mx-auto w-full max-w-md">
                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        বিস্তারিত লগইন, বাজার দর দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <form className="space-y-3">
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

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="btn h-9 min-h-9 w-full border-0 bg-green-600 text-xs text-white hover:bg-green-700"
                        >
                            সাইন ইন
                        </button>

                        {/* Divider */}
                        <div className="divider my-2 text-[10px] text-gray-400">
                            অথবা
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                className="btn btn-outline h-8 min-h-8 bg-white text-[10px] font-normal"
                            >
                                <span className="text-sm">G</span>
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

                        {/* Sign Up */}
                        <p className="pt-1 text-center text-[10px] text-gray-500">
                            অ্যাকাউন্ট নেই?{" "}
                            <a
                                href="/sign-up"
                                className="font-medium text-green-600 hover:underline"
                            >
                                সাইন আপ করুন
                            </a>
                        </p>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-4 text-center text-[10px] text-gray-400">
                    — লগইন করে নিরাপদে থাকুন
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
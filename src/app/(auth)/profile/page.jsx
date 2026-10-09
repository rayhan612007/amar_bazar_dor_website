"use client";

import { authClient, signOut } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending, refetch } = authClient.useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const user = session?.user;

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdateName = async (e) => {
        e.preventDefault();

        if (isUpdating) return;

        const trimmedName = name.trim();

        if (!trimmedName) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        if (trimmedName === user?.name) {
            toast.info("আপনার নামের কোনো পরিবর্তন হয়নি");
            return;
        }

        setIsUpdating(true);

        const { error } = await authClient.updateUser({
            name: trimmedName,
        });

        setIsUpdating(false);

        if (error) {
            toast.error(error.message || "নাম হালনাগাদ করতে ব্যর্থ হয়েছে");
            return;
        }

        if (refetch) await refetch();
        toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
    };

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);

        const { error } = await signOut();

        setIsSigningOut(false);

        if (error) {
            toast.error(error.message || "সাইন আউট করা যায়নি");
            return;
        }

        toast.success("সফলভাবে সাইন আউট হয়েছে!");
        setTimeout(() => {
            router.push("/");
            router.refresh();
        }, 1000);
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f2f5f3]">
                <span className="loading loading-spinner loading-lg text-emerald-600"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f2f5f3] p-4">
                <div className="text-center">
                    <p className="mb-4 text-gray-700">
                        প্রোফাইল দেখতে আগে সাইন ইন করুন।
                    </p>
                    <Link href="/sign-in" className="btn bg-[#008744] text-white">
                        সাইন ইন
                    </Link>
                </div>
            </div>
        );
    }

    const initial = user?.name?.trim()
        ? user.name.trim().charAt(0).toUpperCase()
        : "M";

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-[#f2f5f3] p-4 pt-8 font-sans text-gray-800">
            <div className="w-full max-w-xl">
                {/* Section Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card mb-4 w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#008744]">


                                <span className="text-lg font-semibold text-white">
                                    {initial}
                                </span>

                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    {user.name}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Sign Out Button */}
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={handleSignOut}
                                disabled={isSigningOut}
                                className="rounded-lg border border-red-300 bg-red-50 px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                                {isSigningOut ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs mr-1"></span>
                                        সাইন আউট হচ্ছে...
                                    </>
                                ) : (
                                    "সাইন আউট"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Edit Form Card */}
                <div className="card w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
                    <form onSubmit={handleUpdateName} className="flex flex-col gap-4">
                        {/* Name Input */}
                        <div className="form-control w-full">
                            <label className="label pb-1 pl-0">
                                <span className="label-text text-xs font-medium text-gray-700">
                                    নাম
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered w-full rounded-lg border-gray-200 text-sm text-gray-800 focus:border-emerald-600 focus:outline-none"
                                required
                                maxLength={100}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="rounded-lg bg-[#008744] px-5 py-2 text-white font-medium w-fit hover:bg-[#00733a] transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                "নাম হালনাগাদ করুন"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
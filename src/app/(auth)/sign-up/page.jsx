"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignupPage = () => {
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();

        if (!name || name.length < 3) {
            toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
            return;
        }

        if (!email) {
            toast.error("ইমেইল ঠিকানা লিখুন");
            return;
        }

        if (!password) {
            toast.error("পাসওয়ার্ড লিখুন");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }

        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            toast.error("পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর ও একটি সংখ্যা দিন");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.error(
                    error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
                );
                return;
            }

            toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSubmit = async (provider) => {
        if (socialLoading || isLoading) return;

        setSocialLoading(provider);
        toast.info("রিডাইরেক্ট করা হচ্ছে...");

        try {
            const { error } = await signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(
                    error.message || `${provider} দিয়ে সাইন আপ করা যায়নি`
                );
                setSocialLoading("");
            }
        } catch {
            toast.error("সোশ্যাল সাইন-ইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setSocialLoading("");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f5f3] p-4 font-sans text-gray-800">
            {/* Top Navigation Bar */}
            {/* <div className="mb-4 flex w-full max-w-md justify-between items-center text-xs text-gray-600">
                <span>অ্যাকাউন্ট আছে?</span>
                <Link
                    href="/sign-in"
                    className="rounded-lg bg-[#008744] px-3 py-1.5 font-medium text-white hover:bg-[#007038]"
                >
                    সাইন ইন
                </Link>
            </div> */}

            {/* Heading */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <Form
                    className="flex flex-col gap-4"
                    onSubmit={onSubmit}
                >
                    {/* Name */}
                    <TextField
                        isRequired
                        name="name"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-semibold text-gray-800">
                            নাম
                        </Label>
                        <Input
                            name="name"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
                        />
                        <FieldError />
                    </TextField>

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-semibold text-gray-800">
                            ইমেইল
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
                        />
                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        minLength={8}
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-semibold text-gray-800">
                            পাসওয়ার্ড
                        </Label>
                        <InputGroup className="relative flex items-center">
                            <InputGroup.Input
                                name="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="পাসওয়ার্ড লিখুন"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
                            />
                            <InputGroup.Suffix className="absolute right-2">
                                <Button
                                    isIconOnly
                                    type="button"
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible((prev) => !prev)}
                                >
                                    {isVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError />
                    </TextField>

                    {/* Confirm Password */}
                    <TextField
                        isRequired
                        name="confirmPassword"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-semibold text-gray-800">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </Label>
                        <InputGroup className="relative flex items-center">
                            <InputGroup.Input
                                name="confirmPassword"
                                type={isConfirmVisible ? "text" : "password"}
                                placeholder="আবার পাসওয়ার্ড লিখুন"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
                            />
                            <InputGroup.Suffix className="absolute right-2">
                                <Button
                                    isIconOnly
                                    type="button"
                                    aria-label={
                                        isConfirmVisible
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    size="sm"
                                    variant="ghost"
                                    onPress={() =>
                                        setIsConfirmVisible((prev) => !prev)
                                    }
                                >
                                    {isConfirmVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError />
                    </TextField>

                    {/* Submit */}
                    <Button
                        type="submit"
                        isDisabled={isLoading || Boolean(socialLoading)}
                        className="mt-2 w-full rounded-lg bg-[#008744] py-2.5 font-medium text-white transition-colors hover:bg-[#007038]"
                    >
                        {isLoading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "অ্যাকাউন্ট তৈরি করুন"}
                    </Button>
                </Form>

                {/* Divider */}
                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <span className="relative bg-white px-3 text-xs font-medium text-gray-500">
                        অথবা
                    </span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={Boolean(socialLoading) || isLoading}
                        onPress={() => handleSocialSubmit("google")}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        <FcGoogle />
                        <span>
                            {socialLoading === "google"
                                ? "অপেক্ষা করুন..."
                                : "Google দিয়ে চালিয়ে যান"}
                        </span>
                    </Button>

                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={Boolean(socialLoading) || isLoading}
                        onPress={() => handleSocialSubmit("github")}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        <FaGithub />
                        <span>
                            {socialLoading === "github"
                                ? "অপেক্ষা করুন..."
                                : "GitHub দিয়ে চালিয়ে যান"}
                        </span>
                    </Button>
                </div>

                {/* Sign In Link Bottom */}
                <div className="mt-6 text-center text-sm font-medium text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/sign-in"
                        className="text-emerald-700 underline hover:text-emerald-800"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-6 text-sm font-medium text-gray-600 underline hover:text-gray-900"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignupPage;
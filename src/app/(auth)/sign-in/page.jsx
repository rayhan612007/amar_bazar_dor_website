"use client";

import { signIn } from "@/app/lib/auth-client";
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
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignIn = () => {
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!email) {
            toast.error("ইমেইল লিখুন");
            return;
        }

        if (!password) {
            toast.error("পাসওয়ার্ড লিখুন");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await signIn.email({
                email,
                password,
                rememberMe: true,
            });

            if (error) {
                toast.error(
                    error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"
                );
                setIsLoading(false);
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
                    error.message || `${provider} দিয়ে সাইন ইন করা যায়নি`
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
            {/* Title Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    সাইন ইন
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                        minLength={8}
                        name="password"
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
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
                            />

                            <InputGroup.Suffix className="absolute right-2">
                                <Button
                                    isIconOnly
                                    type="button"
                                    aria-label={
                                        isVisible
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-500 hover:text-gray-700"
                                    onPress={() =>
                                        setIsVisible((prev) => !prev)
                                    }
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

                    {/* Submit */}
                    <Button
                        type="submit"
                        isDisabled={isLoading || Boolean(socialLoading)}
                        className="mt-2 w-full rounded-lg bg-[#008744] py-2.5 font-medium text-white transition-colors hover:bg-[#007038]"
                    >
                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
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

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Google */}
                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={Boolean(socialLoading) || isLoading}
                        onPress={() => handleSocialSubmit("google")}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        <FcGoogle />
                        <span className="text-center leading-tight">
                            {socialLoading === "google"
                                ? "অপেক্ষা করুন..."
                                : "Google দিয়ে চালিয়ে যান"}
                        </span>
                    </Button>

                    {/* GitHub */}
                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={Boolean(socialLoading) || isLoading}
                        onPress={() => handleSocialSubmit("github")}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        <FaGithub />
                        <span className="text-center leading-tight">
                            {socialLoading === "github"
                                ? "অপেক্ষা করুন..."
                                : "GitHub দিয়ে চালিয়ে যান"}
                        </span>
                    </Button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm font-medium text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="text-emerald-700 underline hover:text-emerald-800"
                    >
                        সাইন আপ করুন
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

export default SignIn;
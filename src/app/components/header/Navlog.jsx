"use client";

import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

const Navlog = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const initial = user?.name?.trim()
    ? user.name.trim().charAt(0).toUpperCase()
    : "U";

  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      closeDropdown();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex animate-pulse items-center gap-2 rounded-xl border border-gray-300 bg-[#f4f7f4] px-3 py-1.5">
        <div className="size-6 rounded-full bg-gray-300" />
        <div className="h-4 w-24 rounded bg-gray-300" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          {/* Dropdown Trigger */}
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-300 bg-[#f4f7f4] px-3 py-1.5 text-gray-800 shadow-xs transition-colors hover:bg-gray-100"
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-[#008744] text-xs font-bold text-white">
              {initial}
            </div>

            <span className="text-sm font-semibold text-gray-800">
              {user.name || "User"}
            </span>

            <IoIosArrowDown className="text-gray-600" />
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[50] mt-2 w-64 gap-1 rounded-2xl border border-gray-100 bg-white p-4 text-gray-700 shadow-xl"
          >
            {/* User Info */}
            <li className="pointer-events-none px-2 py-1">
              <p className="text-sm font-semibold text-gray-800">
                {user.name || "User"}
              </p>
              <p className="truncate text-xs text-gray-400">
                {user.email}
              </p>
            </li>

            <li className="my-1 list-none border-t border-gray-100" />

            {/* Profile Link */}
            <li>
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                <FaUser className="text-[#008744]" />
                <span>আমার প্রোফাইল</span>
              </Link>
            </li>

            {/* Sign Out Button */}
            <li>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PiSignOutBold />
                <span>
                  {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <Link
            href="/sign-in"
            className="btn btn-sm h-9 border border-gray-300 bg-white px-4 font-medium text-gray-800 hover:bg-gray-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-sm h-9 border-none bg-[#008744] px-4 font-medium text-white hover:bg-[#007038]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navlog;
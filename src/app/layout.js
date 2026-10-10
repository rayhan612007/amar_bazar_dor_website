import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/header/Navbar";
import Footer from "./components/header/Footer";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const notoserifbengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "Find the latest market prices in Bangladesh.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${notoserifbengali.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f4f8f4] font-sans">
        <Suspense fallback="">

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <Navbar />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-gray-100 py-6 text-xs text-gray-600">
            <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 text-center md:flex-row md:text-left">
                <p className="font-medium text-gray-800">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-gray-500">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;
"use client";
import Link from 'next/link';

const Page = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                <h1 className="text-6xl font-medium text-red-500">404</h1>
                <h2 className="mt-4 text-2xl text-gray-400">Oops! Page not found</h2>
                <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
                <Link href="/" className="inline-block px-4 py-2 mt-4 text-white bg-orange-700 rounded hover:bg-orange-600">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Page;

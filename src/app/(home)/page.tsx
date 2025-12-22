"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center">
      <main>
        <h1 className="text-3xl font-extrabold">Rwanda data management</h1>
        <h1 className="text-xl font-medium">All in 1 search</h1>
        <ul className="mt-4 space-y-1 list-disc list-inside">
          <li className="text-sm">A centralized system for managing Rwanda's UPI.</li>
          <li>Allow users to search for UPI data & view it on google maps</li>
          <li>Allow users to get the real distance to travelfrom his current location <br /> to reach the searchable UPI.</li>
          <li className="text-sm">Facilitates easy access and retrieval of citizen information for his national ID.</li>
        </ul>
        <div className="mt-6">
          <Link href="/upi" className="p-2 px-4 mt-6 font-bold text-orange-600 bg-white border-amber-50 rounded-3xl text-md hover:text-orange-700 hover:bg-gray-100">
            Search UPI data
          </Link>
        </div>

        <div className="mt-6 mb-2">
          <Link href="/citizen-information" className="p-2 px-4 font-bold text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            Search national ID data
          </Link>
        </div>
      </main>
    </div>
  );
}

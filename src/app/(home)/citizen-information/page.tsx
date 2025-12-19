"use client";

import UpidataDisplay from "@/components/upi/UpidataDisplay";
import { fetchUpiData } from "@/services/apiKey";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [nationalId, setNationalId] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUpiData(nationalId),
    enabled: !!queryKey,
    notifyOnChangeProps: ["data", "error", "isLoading"]
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryKey("nationalId-data");
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-3xl font-extrabold">
          <Link href="/" className="text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          National ID System
        </h1>
        <p className="text-sm">Facilitates easy access and retrieval of citizen information.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="Enter national ID"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-blue-500 rounded-3xl ${nationalId.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Fetch ID Data
          </button>
        </form>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data && <UpidataDisplay data={data.data} />}
      </main>
    </div>
  );
};

export default Page;

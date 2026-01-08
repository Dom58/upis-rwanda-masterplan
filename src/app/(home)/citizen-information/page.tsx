"use client";

import { AppConfig } from "@/app/configs";
import { INewCitizenDataResponse } from "@/app/types";
import CitizenData from "@/components/citizenData/CitizenData";
import { findNationalIdData } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [nationalId, setNationalId] = useState("");
  const [data, setData] = useState<INewCitizenDataResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [accessCode, setAccessCode] = useState("");
  const [isAccessValid, setIsAccessValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: findNationalIdData,
    onError(error: any) {
      const errorMessage = error.response?.data?.message
        ? error.response?.data?.message
        : error.response?.data?.error.content || error.message;
      setError(errorMessage);
      setNationalId("");
      setLoading(false);
    },
    onSuccess: (res) => {
      setLoading(false);
      setData(res);
      setError("");
      setNationalId("");
    },
  });

  const checkAccessCode = (code: number) => {
    const ACCESS_CODE = String(AppConfig.accessCode).length;
    return code === ACCESS_CODE;
  };

  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAccessCode(Number(accessCode))) {
      setIsAccessValid(true);
      setAccessCode("");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid access code. Please contact the system admin to provide the code.");
      setAccessCode("");
    }
  };

  const submitInformationTracker = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    mutation.mutate(nationalId);
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-xl font-extrabold">
          <Link href="/" className="text-2xl text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          Rwanda national ID system
        </h1>
        <div>
          <div className="p-2 mt-1 rounded-lg bg-gray-50/20">
            <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
              <li>Facilitates easy access and fetch the citizen information.</li>
              <li>Easy access and get the citizen information from the national ID.</li>
            </ul>
          </div>
        </div>


        <form onSubmit={handleVerifyAccessCode} className={`mt-4 ${isAccessValid ? 'hidden' : ''}`}>
          <div className="mb-2">
            <label className="mb-1 text-gray-600" htmlFor="accessCode">
              Access password(shared by system admin)
            </label>
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter access password"
              className="w-full p-4 border border-white rounded-3xl focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex p-2 mt-2 mb-1 text-white bg-[#fe6787] cursor-pointer rounded-3xl"
          >
            Verify access password
          </button>
          {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
        </form>

        <form onSubmit={submitInformationTracker} className={`mt-4 ${!isAccessValid ? 'blur-sm' : ''}`}>
          <p className="mb-1 text-gray-600">National ID</p>
          <input
            type="text"
            value={nationalId}
            onChange={(e) => {
              setNationalId(e.target.value);
              setError("");
              setData(null);
            }}
            placeholder="Enter national ID"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
            disabled={!isAccessValid}
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${nationalId.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={!isAccessValid}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        {data && <CitizenData data={data} />}
      </main>
    </div>
  );
};

export default Page;

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center justify-between w-full max-w-3xl min-h-screen px-16 py-32 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-extrabold">UPIs Management System</h1>
      </main>
    </div>
  );
}

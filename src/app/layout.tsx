import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "@/app/globals.css";
import { Provider } from "@/components/common/Provider";

const poppins = Poppins({
  preload: true,
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressContentEditableWarning>
        <Provider>
          <Suspense> {children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "UPIs Management System",
  description: "Manage All UPIs efficiently and securely.",
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPIs | Rwanda UPI management system",
  description: "UPI Management System - Manage All UPIs efficiently and securely.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen Information | Rwanda UPI management system",
  description: "Citizen Information Management System - Manage All Citizen data efficiently and securely.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found | Rwanda UPI management system"
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;

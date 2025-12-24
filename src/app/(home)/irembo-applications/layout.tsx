import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Irembo Applications | All in one finder system"
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;

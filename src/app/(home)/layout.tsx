import { IHomeProps } from "../types";

const Layout = ({ children }: IHomeProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#9d986f] to-[#9fc6da] flex items-center justify-center p-4">
            {children}
        </div>
    );
};

export default Layout;

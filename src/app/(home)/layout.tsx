import Image from "next/image";
import { IHomeProps } from "../types";

const Layout = ({ children }: IHomeProps) => {
    return (
        <main className="bg-gradient-to-br from-[#ffffff] via-[#b3b2b0] to-[#46494b] min-h-screen p-4">
            <div>
                <Image
                    src="https://www.sjgroup.com/wp-content/uploads/2025/06/sj-projects-11-kilgali-master-plan-14-Kigali-MP-Review-Aerial-View.jpg?quality=80"
                    alt="Rwanda Emblem"
                    width={80}
                    height={100}
                    className="w-full mx-auto mb-4 rounded-lg shadow-lg"
                />
            </div>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </main>
    );
};

export default Layout;

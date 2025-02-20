"use client"
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import localFont from "next/font/local";
import "../../globals.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import authWrapper from "@/lib/hoc/AuthWrapper";

const geistSans = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

function DeveloperDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userProfile = useSelector((state: any) => state.userProfile);
    const [toggleSideBar, setToggleSideBar] = useState("true");
    
    const isUserOnboarded = userProfile.is_onboard;

    return (
        <section className={`${geistSans.variable} ${geistMono.variable} h-screen bg-gray-100 text-black`}>
            <div className="grid grid-cols-12 grid-rows-12 gap-5 min-h-screen max-h-screen p-4">
                {isUserOnboarded && (
                    <div
                        className={`col-span-0 ${toggleSideBar ? "lg:col-span-2" : "lg:col-span-1"
                            } row-span-0 lg:row-span-12 block w-full transition duration-1000 ease-in-out`}
                    >
                        <DashboardSidebar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
                    </div>
                )}

                <div className={`${isUserOnboarded ? `col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"}` : "col-span-12"} row-span-2 row-start-1 w-full`}>
                    <DashboardNavbar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
                </div>
                <main className={`${isUserOnboarded ? `col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"} ` : "col-span-12"} row-span-10 row-start-3 w-full h-full overflow-y-scroll`}>
                    {children}
                </main>
            </div>
        </section>
    );
}

export default authWrapper(DeveloperDashboardLayout, {
    authRequired: true,
    role: [
        "Individual",
    ],
});
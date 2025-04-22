"use client"
import DasboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import localFont from "next/font/local";
import { useState } from "react";
import "../../globals.css";

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

export default function CompanyDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [toggleSideBar, setToggleSideBar] = useState(true);

    return (
        <section className={`${geistSans.variable} ${geistMono.variable} h-screen bg-gray-100 text-black`}>
            <div className="grid grid-cols-12 grid-rows-12 gap-5 min-h-screen max-h-screen p-4">
                <div
                    className={`col-span-0 ${toggleSideBar ? "lg:col-span-2" : "lg:col-span-1"
                        } row-span-0 lg:row-span-12 block w-full transition duration-1000 ease-in-out`}
                >
                    <DashboardSidebar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
                </div>

                <div className={`col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"} row-span-2 row-start-1 w-full`}>
                    <DasboardNavbar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
                </div>
                <main className={`col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"} row-span-10 row-start-3 w-full h-full overflow-y-scroll`}>
                    {children}
                </main>
            </div>
        </section >
    );
}

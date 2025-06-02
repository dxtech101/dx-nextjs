"use client"
import DasboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import localFont from "next/font/local";
import { useState } from "react";
import "../../globals.css";
import WebLayout from "@/app/(web)/layout";
import Link from "next/link";

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
    const commingSoon = false;

    if (commingSoon) {
        return (
            <WebLayout>
                <section className="relative bg-white h-fit lg:h-screen p-6 xl:p-0 overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-around min-h-screen items-center gap-6 container mx-auto">
                        <div className="relative w-full flex flex-col justify-start items-start xl:max-w-lg mx-auto text-black gap-10">
                            <span className='flex flex-col gap-6'>
                                <h2 className="text-4xl md:text-7xl font-medium leading-tight">
                                    Coming Soon in May 2025!
                                </h2>
                                <p className='text-gray-500 text-md xl:text-xl'>
                                    Hire Exceptional Salesforce Experts for Your Projects
                                </p>
                                <Link href='/'>
                                    <div className="bg-black text-white px-6 py-2 w-fit rounded-full flex items-center">
                                        Explore more <span className="ml-1">→</span>
                                    </div>
                                </Link>
                            </span>
                        </div>
                        <div className='flex flex-col gap-6 items-center w-full relative'>
                            <div
                                className="size-[44rem] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)'
                                }}
                            />
                            <img src="/comingsoon.png" alt="sumo logo" className="rounded-xl aspect-auto object-cover h-48 lg:h-96 w-auto z-20" />
                        </div>
                    </div>
                </section>
            </WebLayout>
        )
    }

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

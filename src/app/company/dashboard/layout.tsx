"use client"
import Navbar from "@/components/DashboardNavbar";
import "@/lib/axios-configuration";
import Sidebar from "@/components/DashboardSidebar";
import "../../globals.css";
import { useState } from "react";

export default function CompanyDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const sideBar = true;
    const [toggleSideBar, setToggleSideBar] = useState();

    return (
        <section className={`h-screen bg-gray-100 text-black`}>
            <div className="grid grid-cols-12 grid-rows-12 gap-5 min-h-screen max-h-screen p-4">
                {sideBar && (
                    <div
                        className={`col-span-0 ${toggleSideBar ? "lg:col-span-2" : "lg:col-span-1"
                            } row-span-0 lg:row-span-12 block w-full transition duration-1000 ease-in-out`}
                    >
                        <Sidebar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
                    </div>
                )}

                <div className={`${sideBar ? `col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"}` : "col-span-12"} row-span-2 row-start-1 w-full`}>
                    <Navbar setToggleSideBar={setToggleSideBar} />
                </div>
                <main className={`${sideBar ? `col-span-12 col-start-1 ${toggleSideBar ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-11 lg:col-start-2"} ` : "col-span-12"} row-span-10 row-start-3 w-full h-full overflow-y-scroll`}>
                    {children}
                </main>
            </div>
        </section>
    )
}

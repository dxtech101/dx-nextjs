"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import Navbar from "@/components/developer/Navbar";
import Sidebar from "@/components/developer/Sidebar";
import { useState } from "react";

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

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sideBar = false;

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} h-screen bg-gray-100 text-black`}>
                <div className="grid grid-cols-12 grid-rows-12 gap-5 min-h-screen max-h-screen p-4">
                    {sideBar && (
                        <div className="col-span-2 row-span-12 hidden lg:block w-full">
                            <Sidebar />
                        </div>
                    )}
                    <div className={`${sideBar ? "col-span-12 lg:col-span-10" : "col-span-12"} row-span-2 w-full`}>
                        <Navbar />
                    </div>
                    <main className={`${sideBar ? "col-span-12 lg:col-span-10 col-start-1 lg:col-start-3" : "col-span-12"} row-span-10 row-start-3 w-full h-full overflow-y-scroll`}>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}

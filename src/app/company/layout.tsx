"use client"
import StateProvider from "@/feature/Provider";
import "../globals.css";
import "@/lib/axios-configuration"

export default function CompanyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <StateProvider>
                {children}
            </StateProvider>
        </section>
    )
}

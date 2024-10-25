"use client"
import StateProvider from "@/feature/Provider";
import "../globals.css";
import "@/lib/axios-configuration"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <StateProvider>
                    {children}
                </StateProvider>
            </body>
        </html>
    )
}

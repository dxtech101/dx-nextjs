"use client"
import StateProvider from "@/feature/Provider";
import "../globals.css";
import "@/lib/axios-configuration"
import { Toaster } from "react-hot-toast";


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
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  )
}

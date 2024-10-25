"use client"
import { Toaster } from "react-hot-toast";
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
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  )
}

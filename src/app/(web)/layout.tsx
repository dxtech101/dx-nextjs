"use client"
import Footer from "@/components/web/Footer";
import NavBar from "@/components/web/Navbar";
import StateProvider from "@/feature/Provider";
import "@/lib/axios-configuration";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import "../globals.css";
import { use } from "react";
import { useParams, usePathname } from "next/navigation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <title>DX Digital</title>
        <NavBar />
        <div className="mt-16">
          <StateProvider>
            {children}
          </StateProvider>
          <Toaster />
        </div>
        <Footer />
      </body>
    </html >
  );
}

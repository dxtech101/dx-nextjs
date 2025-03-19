"use client"
import Footer from "@/components/web/Footer";
import NavBar from "@/components/web/Navbar";
import StateProvider from "@/feature/Provider";
import "@/lib/axios-configuration";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import "../globals.css";

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

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <meta
        property="og:image"
        content="https://media.licdn.com/dms/image/D562DAQHBVIM3haY1Mg/profile-treasury-image-shrink_800_800/0/1703088018579?e=1703703600&v=beta&t=6JJU8HNqfTe3Y5L277JO1FJsGWbcRV9dY5T1x8x129o"
      />
      <meta
        property="og:description"
        content="Proactive learner, aspiring Software developer & Design enthusiast"
      />
      <title>DX Digital</title>
      <NavBar />
      <div className="mt-16 container mx-auto px-6">
        <StateProvider>
          {children}
        </StateProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
      <Footer />
    </>
  );
}

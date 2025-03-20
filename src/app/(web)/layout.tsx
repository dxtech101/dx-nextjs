"use client";
import Footer from "@/components/web/Footer";
import NavBar from "@/components/web/Navbar";
import StateProvider from "@/feature/Provider";
import "@/lib/axios-configuration";
import localFont from "next/font/local";
import Script from "next/script";
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
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9XRKRQNWT9"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9XRKRQNWT9', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <meta
          property="og:image"
          content=""
        />
        <meta
          property="og:description"
          content="Join Developer Exchange, the premier Salesforce talent portal. Connect directly with top companies, earn higher rates, enjoy flexible work, and grow professionally. Showcase your skills, get matched with top projects, and join an elite network of Salesforce experts for career growth."
        />
        <title>DX Digital</title>
      </head>
      <body>
        <NavBar />
        <div className="mt-16">
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
      </body>
    </html>
  );
}

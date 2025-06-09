"use client"
import "@/lib/axios-configuration";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Maintainance from "@/components/Maintainance";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if (process.env.NEXT_PUBLIC_MAINTAINANCE_MODE === "true") {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>DX Digital</title>
        </head>
        <body>
          <Maintainance />
        </body>
      </html>
    )
  }

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
        <Script
          id="apollo-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo() {
                var n = Math.random().toString(36).substring(7);
                var o = document.createElement("script");
                o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
                o.async = true;
                o.defer = true;
                o.onload = function() {
                  window.trackingFunctions.onLoad({ appId: "67f3c60694c826001142c267" });
                };
                document.head.appendChild(o);
              }
              initApollo();
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
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 1000,
            }}
          />
      </body>
    </html>
  )
}

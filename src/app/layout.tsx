"use client"
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "@/lib/axios-configuration"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          property="og:image"
          content=""
        />
        <meta
          property="og:description"
          content="Join Developer Exchange, the premier Salesforce talent portal. Connect directly with top companies, earn higher rates, enjoy flexible work, and grow professionally. Showcase your skills, get matched with top projects, and join an elite network of Salesforce experts for career growth."
        />
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

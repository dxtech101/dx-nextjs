"use client"
import StateProvider from "@/feature/Provider";
import "../globals.css";
import "@/lib/axios-configuration"
import { Toaster } from "react-hot-toast";

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
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
    </section>
  )
}

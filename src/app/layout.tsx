import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TNT Car Booking | Premium Fleet & Transparent Rental Service",
  description: "Rent premium electric, luxury, SUV, and economy vehicles with instant confirmation, transparent daily pricing, and zero hidden fees.",
  keywords: ["car rental", "vehicle booking", "electric car rental", "luxury car rental", "SUV rental", "TNT car booking"],
  openGraph: {
    title: "TNT Car Booking — Drive Excellence",
    description: "Instant vehicle reservations with transparent rates and premium service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-neutral-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

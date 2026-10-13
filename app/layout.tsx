import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RixxGames - Portal Game Online Gratis",
  description: "Mainkan puluhan game online gratis dan seru langsung dari browser di RixxGames!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Script Iklan Adsterra (Popunder & Social Bar) */}
        <Script
          src="https://pl31802886.profitableratecpmnetwork.com/13/4a/e1/134ae1f6d4c1ec546d9f83699780278e.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://pl31802887.profitableratecpmnetwork.com/4b/98/b2/4b98b2b42c0031cbbe0d558dc9fcc8c5.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100">
        {children}
      </body>
    </html>
  );
}
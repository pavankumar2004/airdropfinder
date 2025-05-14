import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "../components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AirdropFinder - Discover the Best Crypto Airdrops & Earning Opportunities",
  description: "Find the latest crypto airdrops, faucets, and earn opportunities. Compare rewards and maximize your crypto earnings with our comprehensive directory.",
  keywords: "crypto airdrops, free crypto, earn crypto, faucets, learn to earn, crypto rewards",
  metadataBase: new URL('https://airdropfinders.vercel.app'),
  openGraph: {
    title: "AirdropFinder - Discover the Best Crypto Airdrops & Earning Opportunities",
    description: "Find the latest crypto airdrops, faucets, and earn opportunities. Compare rewards and maximize your crypto earnings with our comprehensive directory.",
    url: 'https://airdropfinders.vercel.app',
    siteName: 'AirdropFinder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AirdropFinder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AirdropFinder - Discover the Best Crypto Airdrops & Earning Opportunities",
    description: "Find the latest crypto airdrops, faucets, and earn opportunities. Compare rewards and maximize your crypto earnings with our comprehensive directory.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

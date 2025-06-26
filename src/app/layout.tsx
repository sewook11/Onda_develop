import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import ReviewDetailModal from "./mypage/_components/ReviewDetailModal";
import ChatModal from "./(chat)/_components/ChatModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "온:다 - 함께하는 취향 모임",
  description: "당신과 같은 관심사를 가진 사람들을 만나는 온다에서 새로운 취향을 발견해보세요.",
  openGraph: {
    title: "온:다",
    description:"나와 같은 관심사를 가진 사람들, 온:다",
    url: "https://ondamoim.com",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <ReviewDetailModal />
          <ChatModal />
        </Providers>
      </body>
    </html>
  );
}

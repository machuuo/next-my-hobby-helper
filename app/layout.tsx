import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CommonHeader from "@/components/organisms/header/CommonHeader";
import CommonNav from "@/components/organisms/navigation/CommonNav";
import CommonFooter from "@/components/organisms/footer/CommonFooter";
import RecoilRootProvider from "@/store/RecoilRootProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "나의 취미생활",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilRootProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col `}
        >
          <div className="flex flex-col items-center justify-start w-full h-screen">
            {/* 공통 헤더 UI */}
            <CommonHeader />
            {/* 공통 네비게이터 UI */}
            <CommonNav />
            <main className="hello flex flex-col items-center justify-center w-full h-main">
              {children}
            </main>
            {/* 공통 푸터 UI */}
            <CommonFooter />
          </div>
        </body>
      </RecoilRootProvider>
    </html>
  );
}

import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { PDFProvider } from "@/provider/pdfContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionWrapper from "./_app";
import "./globals.css";
import { AuthProvider } from "./Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Talk2PDF",
    description: "Chat with your PDF documents using AI",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionWrapper>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <LayoutWrapper>
                            <AuthProvider>
                                <PDFProvider>{children}</PDFProvider>
                            </AuthProvider>
                        </LayoutWrapper>
                    </ThemeProvider>
                </body>
            </html>
        </SessionWrapper>
    );
}

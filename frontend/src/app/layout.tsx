import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastCont from "@/components/utils/ToastCont";
import getSession from "@/lib/session";
import UserProvider from "@/context/UserProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | URL Shortener',
        default: 'URL Shortener | Home',
    },
    description: "A full-stack URL shortener application that allows authenticated users to create, manage, and track shortened URLs via a dashboard.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getSession(); // fetch user on server (action), then pass to Provider
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <UserProvider initialUser={user}>
                    {children}
                    <ToastCont />
                </UserProvider>
            </body>
        </html>
    );
}
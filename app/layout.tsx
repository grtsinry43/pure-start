import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import StoreProvider from "@/app/store-provider";
import {Toaster} from "sonner";

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head/>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <StoreProvider>
                        {children}
                        <Toaster/>
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}


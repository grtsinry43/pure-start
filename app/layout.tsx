import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head/>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}


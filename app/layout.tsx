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
        <html lang="zh" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <title>JustPure 起始页 - 摒弃繁杂，唯有纯粹</title>
                <meta name="description" content="JustPure 起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>

                <meta name="keywords" content="JustPure, 起始页, 简洁, 高效, 主页, 生产力, 专注, 任务管理"/>
                <meta name="author" content="grtsinry43"/>
                <meta name="robots" content="index, follow"/>

                <meta property="og:type" content="website"/>
                <meta property="og:title" content="JustPure 起始页 - 摒弃繁杂，唯有纯粹"/>
                <meta property="og:description" content="JustPure 起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>
                <meta property="og:image" content="https://private-user-images.githubusercontent.com/77447646/419899840-d2e85a6d-5eae-423c-8101-edbcd8110eb2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDEyNjg4MDYsIm5iZiI6MTc0MTI2ODUwNiwicGF0aCI6Ii83NzQ0NzY0Ni80MTk4OTk4NDAtZDJlODVhNmQtNWVhZS00MjNjLTgxMDEtZWRiY2Q4MTEwZWIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA2VDEzNDE0NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWYyNWM1M2E4NDM3MjQyMjQwMDczZjhmOThhY2FhZjI2NmM1OTMwOGI3NzZkODg2MzhjMmZkMWIzNzE0NDVkNjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mJS1DWC6xHORyPVIOwqaUE6A2ShIsw4xSl5g7L_THaU"/>
                <meta property="og:url" content="https://justpure.dev"/>
                <meta property="og:site_name" content="JustPure"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="JustPure 起始页 - 摒弃繁杂，唯有纯粹"/>
                <meta name="twitter:description" content="JustPure 起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>
                <meta name="twitter:image" content="https://private-user-images.githubusercontent.com/77447646/419899840-d2e85a6d-5eae-423c-8101-edbcd8110eb2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDEyNjg4MDYsIm5iZiI6MTc0MTI2ODUwNiwicGF0aCI6Ii83NzQ0NzY0Ni80MTk4OTk4NDAtZDJlODVhNmQtNWVhZS00MjNjLTgxMDEtZWRiY2Q4MTEwZWIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA2VDEzNDE0NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWYyNWM1M2E4NDM3MjQyMjQwMDczZjhmOThhY2FhZjI2NmM1OTMwOGI3NzZkODg2MzhjMmZkMWIzNzE0NDVkNjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mJS1DWC6xHORyPVIOwqaUE6A2ShIsw4xSl5g7L_THaU"/>

                <link rel="icon" href="/favicon.ico"/>
            </head>

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


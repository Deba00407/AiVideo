"use client"

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next"
import { ThemeProvider } from "@/components/ui/theme-provider";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={3 * 60}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ImageKitProvider>
        </SessionProvider>
    )
}
"use client"
import { ImageKitProvider } from "@imagekit/next";
import { SessionContext, SessionProvider } from "next-auth/react";

const urlEndPoint = process.env.NEXY_PUBLIC_URL_ENDPOIN!;

export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndPoint}>
            {children}
        </ImageKitProvider>
    </SessionProvider>
}
'use client'
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient()

const MainProvider: FC<PropsWithChildren> = ({ children }) => {

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}> 
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default MainProvider;
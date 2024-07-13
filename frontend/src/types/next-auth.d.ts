import { DefaultSession } from "next-auth"

declare module 'next-auth' {
    interface Session {
        user: {
            id: number,
            username: string,
            email: string,
            position: string,
            jwt: string,
            avatar: { url: string; id: number}[],
        }
    }
    interface User {
        id: number,
        username: string,
        email: string,
        jwt: string,
        position: string,
        avatar: { url: string; id: number}[],
    }
}
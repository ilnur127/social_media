'use client'
import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/utils/fetcher";
import { IUser } from "@/types/user.types";

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => fetcher<IUser>('users/me?populate[avatar]=*&populate[friends][populate][avatar]=*', { method: 'GET', isAuth: true }),
    })
}
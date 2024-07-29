'use client';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';
import { IUser } from '@/types/user.types';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      fetcher<IUser>(
        'users/me?populate[avatar]=*&populate[chats]=*&populate[blockedPeople][populate][avatar]=*&populate[blockedPeople][populate][blockedPeople]=*&populate[friends][populate][avatar]=*&populate[friends][populate][blockedPeople][populate]=*&populate[friends][populate][chats][populate]=*',
        { method: 'GET', isAuth: true },
      ),
  });
}

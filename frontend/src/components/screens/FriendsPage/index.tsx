'use client'
import { UsersGridCard } from "@/components/ui";

import classes from './index.module.scss'
import { fetcher } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types/user.types";
import { useSession } from "next-auth/react";

export default function FriendsPage() {
  const { data: user } = useSession()

  const { data: friends, isLoading, refetch } = useQuery({
    queryKey: ['friends'],
    queryFn: () => fetcher<IUser[]>(`users?populate[avatar]=*&populate[chats][populate]=*&populate[friends][populate]=*&populate[blockedPeople][populate]=*&filters[friends][$contains]=${user?.user.id}`, { method: 'GET', isAuth: true }),
  })

  console.log(friends);

  return (
    <div className={classes.friendsBlock}>
      <h1>My Friends</h1>
      <hr />
      {friends && Array.isArray(friends) && friends.length > 0 ?
        <UsersGridCard users={friends} isLoading={isLoading} refetch={refetch} isJustFriend={true} />
        : <p>Friend not found</p>}
    </div>
  );
}
  
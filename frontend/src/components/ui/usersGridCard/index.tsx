'use client'
import { Loader } from "lucide-react";

import { IUser } from "@/types/user.types";

import classes from './index.module.scss'
import UserCard from "./UserCard";
import { useProfile } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { toast } from "react-toastify";
import { IChat } from "@/types/chat.types";

type TUsersGridCardParams = { users: IUser[], isLoading: boolean, isJustFriend?: boolean, refetch: any }

export default function UsersGridCard({ users, isLoading, isJustFriend = false, refetch }: TUsersGridCardParams) {
    const { data: userInfo, refetch: refetchProfile } = useProfile()

    const { mutate: addFriend } = useMutation({
        mutationKey: ['add friend'],
        mutationFn: (friend: IUser) => fetcher(`users/${userInfo?.id}`, {
            method: 'PUT',
            body: {
                friends: [ ...(userInfo?.friends.map(friend => friend.id) || []), friend.id]
            },
            isAuth: true
        }).then(() => fetcher(`users/${friend?.id}`, {
            method: 'PUT',
            body: {
                friends: [ ...(friend?.friends.map(friend => friend.id) || []), userInfo?.id]
            },
            isAuth: true
        })),
        onSuccess: () => {
            refetchProfile()
            refetch()
            toast.success('Friend success add')
        }
    })

    const { mutate: deleteFriend } = useMutation({
        mutationKey: ['delete friend'],
        mutationFn: (friend: IUser) => fetcher(`users/${userInfo?.id}`, {
            method: 'PUT',
            body: {
                friends: userInfo?.friends.filter(f => f.id !== friend.id)
            },
            isAuth: true
        }).then(() => fetcher(`users/${friend?.id}`, {
            method: 'PUT',
            body: {
                friends: friend?.friends.filter(f => f.id !== userInfo?.id)
            },
            isAuth: true
        })),
        onSuccess: () => {
            refetchProfile()
            refetch()
            toast.success('Friend success delete')
        }
    })
  return (
    <div className={classes.usersGridCard}>
      {isLoading ? <Loader /> : users?.map(
        user => <UserCard
            key={user.id}
            isJustFriend={isJustFriend}
            user={user}
            myUserId={Number(userInfo?.id)}
            addFriend={addFriend}
            deleteFriend={deleteFriend}
        />
    )}
    </div>
  );
}
  
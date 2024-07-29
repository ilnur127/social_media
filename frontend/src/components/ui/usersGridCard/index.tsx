'use client';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { IUser } from '@/types/user.types';
import { useProfile } from '@/hooks';
import { fetcher } from '@/utils/fetcher';

import classes from './index.module.scss';
import UserCard from './UserCard';

type TUsersGridCardParams = { users: IUser[]; isLoading: boolean; isJustFriend?: boolean; refetch: any };

export default function UsersGridCard({ users, isLoading, isJustFriend = false, refetch }: TUsersGridCardParams) {
  const { data: userInfo, refetch: refetchProfile } = useProfile();

  const { mutate: addFriend } = useMutation({
    mutationKey: ['add friend'],
    mutationFn: (friend: IUser) =>
      fetcher(`users/${userInfo?.id}`, {
        method: 'PUT',
        body: {
          friends: [...(userInfo?.friends.map((friend) => friend.id) || []), friend.id],
        },
        isAuth: true,
      }).then(() =>
        fetcher(`users/${friend?.id}`, {
          method: 'PUT',
          body: {
            friends: [...(friend?.friends.map((friend) => friend.id) || []), userInfo?.id],
          },
          isAuth: true,
        }),
      ),
    onSuccess: () => {
      refetchProfile();
      refetch();
      toast.success('Friend success add');
    },
  });

  const { mutate: deleteFriend } = useMutation({
    mutationKey: ['delete friend'],
    mutationFn: (friend: IUser) =>
      fetcher(`users/${userInfo?.id}`, {
        method: 'PUT',
        body: {
          friends: userInfo?.friends.filter((f) => f.id !== friend.id),
        },
        isAuth: true,
      }).then(() =>
        fetcher(`users/${friend?.id}`, {
          method: 'PUT',
          body: {
            friends: friend?.friends.filter((f) => f.id !== userInfo?.id),
          },
          isAuth: true,
        }),
      ),
    onSuccess: () => {
      refetchProfile();
      refetch();
      toast.success('Friend success delete');
    },
  });
  const { mutate: addToBlock } = useMutation({
    mutationKey: ['block user'],
    mutationFn: async (user: IUser) =>
      Promise.allSettled([
        fetcher(`users/${userInfo?.id}`, {
          method: 'PUT',
          body: {
            blockedPeople: [...(userInfo?.blockedPeople.map((bUser) => bUser.id) || []), user.id],
          },
          isAuth: true,
        }),
        fetcher(`users/${user?.id}`, {
          method: 'PUT',
          body: {
            blockedPeople: [...(user?.blockedPeople.map((bUser) => bUser.id) || []), userInfo?.id],
          },
          isAuth: true,
        }),
        fetcher(`users/${userInfo?.id}`, {
          method: 'PUT',
          body: {
            friends: userInfo?.friends.filter((f) => f.id !== user?.id),
          },
          isAuth: true,
        }),
        fetcher(`users/${user?.id}`, {
          method: 'PUT',
          body: {
            friends: user?.friends.filter((f) => f.id !== userInfo?.id),
          },
          isAuth: true,
        }),
      ]),
    onSuccess: () => {
      refetchProfile();
      refetch();
      toast.success('User add to block');
    },
  });
  const { mutate: deleteFromBlock } = useMutation({
    mutationKey: ['delete block user'],
    mutationFn: (blockedUser: IUser) =>
      Promise.allSettled([
        fetcher(`users/${userInfo?.id}`, {
          method: 'PUT',
          body: {
            blockedPeople: userInfo?.blockedPeople.filter((f) => f.id !== blockedUser.id),
          },
          isAuth: true,
        }),
        fetcher(`users/${blockedUser?.id}`, {
          method: 'PUT',
          body: {
            blockedPeople: blockedUser?.blockedPeople.filter((f) => f.id !== userInfo?.id),
          },
          isAuth: true,
        }),
      ]),
    onSuccess: () => {
      refetchProfile();
      refetch();
      toast.success('User success delete from block');
    },
  });

  return (
    <div className={classes.usersGridCard}>
      {isLoading ? (
        <Loader />
      ) : (
        users?.map((user) => (
          <UserCard
            key={user.id}
            isJustFriend={isJustFriend}
            user={user}
            myUserId={Number(userInfo?.id)}
            blockedUser={userInfo?.blockedPeople?.findIndex((bUser) => bUser.id === user.id) !== -1}
            addFriend={addFriend}
            deleteFriend={deleteFriend}
            addToBlock={addToBlock}
            deleteFromBlock={deleteFromBlock}
          />
        ))
      )}
    </div>
  );
}

'use client';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useProfile } from '@/hooks';
import { toast } from 'react-toastify';

import { Loader } from '@/components/ui';
import { fetcher, getUserAvatarUrl } from '@/utils';
import { IUser } from '@/types/user.types';

import classes from './index.module.scss';

export default function BlockedUsersPage() {
  const { data: userInfo, isLoading, refetch } = useProfile();

  const { mutate: deleteBlockUser } = useMutation({
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
      refetch();
      toast.success('User success delete from block');
    },
  });

  return (
    <div className={classes.blockedUsersBlock}>
      <h1>My blocked users</h1>
      <hr />
      {userInfo && Array.isArray(userInfo.blockedPeople) && userInfo.blockedPeople.length > 0 ? (
        <div className={classes.usersGridCard}>
          {isLoading ? (
            <Loader />
          ) : (
            userInfo.blockedPeople?.map((user) => (
              <div key={user.id} className={classes.userCard}>
                <Image src={getUserAvatarUrl(user)} alt={user.email} width={150} height={150} />
                <div>
                  <h1 className={classes.userCard_name}>{user.username}</h1>
                  <small>{user.position}</small>
                  <button onClick={() => deleteBlockUser(user)}>Remove in block</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Blocked users not found</p>
      )}
    </div>
  );
}

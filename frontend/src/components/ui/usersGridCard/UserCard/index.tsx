'use client'
import Image from 'next/image';

import { IUser } from '@/types/user.types';
import { getUserAvatarUrl } from '@/utils/getUserAvatarUrl';

import classes from './index.module.scss'

type TUserCardParams = {
  user: IUser,
  myUserId: number,
  isJustFriend: boolean,
  addFriend: (user: IUser) => void,
  deleteFriend: (user: IUser) => void,
}

export default function UserCard({ user, myUserId, isJustFriend, addFriend, deleteFriend }: TUserCardParams) {
  const isFriend = isJustFriend || user.friends?.find(u => u.id === myUserId)

  return (
    <div className={classes.userCard}>
      <Image
        src={getUserAvatarUrl(user)}
        alt={user.email}
        width={150}
        height={150}
      />
      <div>
        <h1 className={classes.userCard_name}>{user.username}</h1>
        <small>{user.position}</small>
        <div className={classes.userCard_actions}>
          {isFriend ?
            <>
              <button>Go to chat</button>
              <button onClick={() => deleteFriend(user)}>Remove user</button>
            </>
            : <button onClick={() => addFriend(user)}>Add to friend</button>
          }
        </div>
      </div>
    </div>
  );
}
  
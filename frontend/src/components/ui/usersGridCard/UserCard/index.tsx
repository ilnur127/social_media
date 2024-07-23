'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user.types';
import { getUserAvatarUrl } from '@/utils/getUserAvatarUrl';

import classes from './index.module.scss'
import { fetcher } from '@/utils/fetcher';
import { IChat } from '@/types/chat.types';
import { UserRoundCheckIcon, UserRoundXIcon } from 'lucide-react';
import clsx from 'clsx';

type TUserCardParams = {
  user: IUser,
  myUserId: number,
  isJustFriend: boolean,
  blockedUser: boolean,
  addFriend: (user: IUser) => void,
  deleteFriend: (user: IUser) => void,
  addToBlock: (user: IUser) => void,
  deleteFromBlock: (user: IUser) => void,
}

export default function UserCard({ user, myUserId, isJustFriend, blockedUser, addFriend, deleteFriend, addToBlock, deleteFromBlock }: TUserCardParams) {
  const router = useRouter()
  const isFriend = isJustFriend || user.friends?.find(u => u.id === myUserId)
  const existChat = user.chats.find((chat) => chat.participants.find(user => user.id === myUserId));

  const goToChat = async () => {
    if (existChat) {
      router.push('./chat/' + existChat.id);
    } else {
      const data = await fetcher<IChat>('chats', {
        method: 'POST',
        isAuth: true,
        body: {
          data: { participants: [myUserId, user.id] }
        }
      })
      router.push('./chat/' + data.id);
    }
  }

  return (
    <div className={clsx(classes.userCard, blockedUser && classes.userCard__blocked)}>
      {blockedUser ?
        <button className={classes.userCard_blockAction} onClick={() => deleteFromBlock(user)}><UserRoundCheckIcon /></button> :
        <button className={classes.userCard_blockAction} onClick={() => addToBlock(user)}><UserRoundXIcon /></button>
      }
      <Image
        src={getUserAvatarUrl(user)}
        alt={user.email}
        width={150}
        height={150}
      />
      <div>
        <h1 className={classes.userCard_name}>{user.username}</h1>
        <small>{user.position}</small>
        {!blockedUser && <div className={classes.userCard_actions}>
          {isFriend ?
            <>
              <button onClick={goToChat}>Go to chat</button>
              <button onClick={() => deleteFriend(user)}>Remove user</button>
            </>
            : <button onClick={() => addFriend(user)}>Add to friend</button>
          }
        </div>}
      </div>
    </div>
  );
}
  
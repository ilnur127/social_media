'use client';
import { PropsWithChildren } from 'react';
import { useParams } from 'next/navigation';

import CurrentUser from '@/components/screens/ChatsPage/CurrentUser';
import ChatsList from '@/components/screens/ChatsPage/ChatList';
import ChatApplications from '@/components/screens/ChatsPage/ChatApplications';

import classes from './index.module.scss';

export default function ChatLayout({ children }: PropsWithChildren) {
  const { id } = useParams();

  return (
    <div className={classes.chatPageBlock}>
      <div className={classes.chatListBlock}>
        <CurrentUser />
        <ChatsList />
      </div>
      <div className={classes.chatBlock}>
        {children}
        {id && <ChatApplications chatId={Number(id)} />}
      </div>
    </div>
  );
}

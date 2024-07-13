'use client'
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';
import { IChat } from '@/types/chat.types';
import { Loader } from '@/components/ui';

import MessageField from './MessageField';
import Message from './Message.tsx';
import ChatHeader from './ChatHeader';
import classes from './index.module.scss';
import { useAuth } from '@/hooks';
import { FileX } from 'lucide-react';
import { useState } from 'react';

export default function Chat({ id }: { id : string}) {
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => fetcher<{ data: IChat }>(`chats/${id}?populate[messages][populate][media]=*&populate[messages][populate][sender][populate][avatar]=*&populate[participants][populate][avatar]=*`,
      { method: 'GET', isAuth: true}
    ),
    select(data) {
        return data.data
    },
    enabled: !!id
  })

  const correspondent = data?.participants?.find(u => u.email !== user?.email)

  return (
    <div className={classes.chatBlock}>
      {isLoading && <Loader />}
      <ChatHeader user={correspondent} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={classes.messagesBlock}>
        {
          data?.messages
            ? data.messages
              .filter(message => message.text?.includes(searchTerm))
              .map(message => <Message key={message.id} message={message}/>)
            : <>
              <FileX />
              <p>Messages not found</p>
            </>
        }
        <MessageField />
      </div>
    </div>
  );
}
  
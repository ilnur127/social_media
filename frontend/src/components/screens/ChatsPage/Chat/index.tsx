'use client';
import { FileX } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';
import { IChat, IMessage } from '@/types/chat.types';
import { Loader } from '@/components/ui';
import { useAuth } from '@/hooks';

import MessageField from './MessageField';
import Message from './Message.tsx';
import ChatHeader from './ChatHeader';
import classes from './index.module.scss';

const scrollToElementById = (id: string) => document.getElementById(id)?.scrollIntoView();

export default function Chat({ id }: { id: string }) {
  const [findMessagesIdBySearch, setFindMessagesIdBySearch] = useState<IMessage[]>([]);
  const [activeFindMessageIndex, setActiveFindMessageIndex] = useState<number>();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['chat', id],
    queryFn: () =>
      fetcher<{ data: IChat }>(
        `chats/${id}?populate[messages][populate][media]=*&populate[messages][populate][audio]=*&populate[messages][populate][sender][populate][avatar]=*&populate[participants][populate][avatar]=*`,
        { method: 'GET', isAuth: true },
      ),
    select(data) {
      return data.data;
    },
    enabled: !!id,
  });

  const correspondent = data?.participants?.find((u) => u.email !== user?.email);

  const findMessagesFn = useCallback(
    (searchTerm: string) => {
      const findMessages = data?.messages.filter((message) => message.text?.includes(searchTerm));
      if (findMessages?.length) {
        setFindMessagesIdBySearch(findMessages || []);
        setActiveFindMessageIndex(findMessages?.length - 1);

        scrollToElementById(`message_${findMessages?.at(-1)?.id}`);
      }
    },
    [data?.messages],
  );

  const switchFindMessage = (id?: number) => {
    setActiveFindMessageIndex(id);
    id && scrollToElementById(`message_${data?.messages[id]?.id}`);
  };

  useEffect(() => {
    if (data?.messages) {
      scrollToElementById(`message_${data?.messages[data?.messages.length - 1].id}`);
    }
  }, [data?.messages]);

  return (
    <div className={classes.chatBlock}>
      {isLoading && <Loader />}
      <ChatHeader
        user={correspondent}
        countFindMessages={findMessagesIdBySearch.length}
        activeFindMessageIndex={activeFindMessageIndex}
        switchFindMessage={switchFindMessage}
        findMessagesFn={findMessagesFn}
      />
      <div className={classes.messagesBlock} id='messagesBlock'>
        {data?.messages ? (
          data.messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isSearchMessage={
                activeFindMessageIndex !== undefined
                  ? findMessagesIdBySearch[activeFindMessageIndex]?.id === message.id
                  : false
              }
            />
          ))
        ) : (
          <div className={classes.emptyMessagesBlock}>
            <FileX />
            <p>Messages not found</p>
          </div>
        )}
        <MessageField />
      </div>
    </div>
  );
}

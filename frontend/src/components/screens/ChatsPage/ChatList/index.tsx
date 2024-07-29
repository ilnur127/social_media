'use client';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Field, Loader } from '@/components/ui';
import { IChat } from '@/types/chat.types';
import { fetcher } from '@/utils/fetcher';
import { useDebounce, useAuth } from '@/hooks';

import ChatsListItem from './ChatListItem';
import classes from './index.module.css';

export default function ChatsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['chats', debouncedSearchTerm],
    queryFn: async () => {
      const { data } = await fetcher<{ data: IChat[] }>(
        `chats?populate[messages][populate][media]=*&populate[messages][populate][audio]=*&populate[participants][populate][avatar]=*&filters[participants][email][$eq]=${user?.email}&filters[$or][0][participants][username][$contains]=${debouncedSearchTerm}&filters[$or][1][messages][text][$contains]=${debouncedSearchTerm}`,
        { method: 'GET', isAuth: true },
      );

      return data;
    },
  });
  return (
    <div className={classes.chatList}>
      <div className={classes.searchBlock}>
        <Field
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search chats'
          Icon={Search}
          type='search'
        />
      </div>
      <div className={classes.chatListBlock}>
        {isLoading ? (
          <Loader />
        ) : data?.length ? (
          data.map((chat) => <ChatsListItem key={chat.id} {...chat} />)
        ) : (
          <p>Chats not found!</p>
        )}
      </div>
    </div>
  );
}

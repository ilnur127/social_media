import { User } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import clsx from 'clsx';

import { IChat } from '@/types/chat.types';
import { useAuth } from '@/hooks';

import classes from './index.module.scss';
import { useParams } from 'next/navigation';


export default function ChatsListItem({ participants, messages, id }: IChat) {
    const { user } = useAuth()
    const { id: activeChatId } = useParams()

    const correspondent = participants?.find(u => u.email !== user?.email)
    const lastMessage = messages?.at(-1)

    return (
      <Link href={`/chat/${id}`} className={clsx(classes.messageBlock, 'animation-slide-fade', Number(activeChatId) === id ? classes.messageBlock_active : '')}>
        {correspondent?.avatar?.length ?
          <Image
            src={process.env.BACK_URL + correspondent?.avatar[0].url}
            alt={correspondent?.email}
            width='40'
            height='40'
          />
        : <User />}
        <div className={classes.messageBlock_info}>
          <div className={classes.messageBlock_header}>
            <span>{correspondent?.username}</span>
            <small>{lastMessage?.publishedAt && format(lastMessage?.publishedAt, 'dd.MM.yyyy HH:mm')}</small>
          </div>
          <small>{lastMessage?.text}</small>
          <small>{lastMessage?.media && 'Вложение'}</small>
        </div>
      </Link>
    );
  }
  
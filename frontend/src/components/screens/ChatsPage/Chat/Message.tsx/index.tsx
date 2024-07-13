'use client'
import { IMessage } from '@/types/chat.types';
import classes from './index.module.scss';
import { useAuth } from '@/hooks';
import clsx from 'clsx';
import Image from 'next/image';
import { format } from 'date-fns';
import { ReadUploadAssets } from '@/components/ui';

type TMessageProps = {
    message: IMessage
}

export default function Message({ message }: TMessageProps) {
    const { user } = useAuth()

    const isSender = user?.id === message.sender.id

    return (
      <div className={clsx(classes.messageBlock, isSender ? classes.senderMessage : '')}>
        <div className={classes.messageBlock_content}>
            <Image
              src={process.env.BACK_URL + message.sender.avatar[0].url}
              alt={message.sender.username}
              width={45}
              height={45}
            />
            <div className={classes.messageBlock_text}>
              <div>
                {message.text && <p>{message.text}</p>}
                {message.media?.length > 0 &&
                  <div className={classes.messageBlock_text__media}>
                    {message.media.map((media) => <ReadUploadAssets key={media.id} uploadAsset={media} />)}
                  </div>
                }
              </div>
              <span>{format(message.createdAt, 'HH:mm')}</span>
            </div>
        </div>
      </div>
    );
  }
  
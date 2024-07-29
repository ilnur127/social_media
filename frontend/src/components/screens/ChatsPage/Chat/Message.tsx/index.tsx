'use client';
import { Trash2Icon } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';

import { useAuth, useReactQuerySubscription } from '@/hooks';
import { ReadUploadAssets } from '@/components/ui';
import { fetcher } from '@/utils';
import { IMessage } from '@/types/chat.types';

import AudioMessage from './AudioMessage';
import classes from './index.module.scss';

type TMessageProps = {
  message: IMessage;
  isSearchMessage: boolean;
};

export default function Message({ message, isSearchMessage }: TMessageProps) {
  const { user } = useAuth();
  const { id } = useParams();
  const send = useReactQuerySubscription();
  const isSender = user?.id === message.sender.id;

  const { mutate } = useMutation({
    mutationKey: ['update chat', message.id],
    mutationFn: () =>
      fetcher('messages/' + message.id, {
        method: 'DELETE',
        isAuth: true,
      }),
    onSuccess: () => {
      send({
        operation: 'delete',
        entity: 'chat',
        id: id.toString(),
        payload: { messageId: message.id },
      });
    },
  });

  return (
    <div className={clsx(classes.messageBlock, isSender ? classes.senderMessage : '')} id={`message_${message.id}`}>
      <Tooltip clickable id={`messageSettingsTooltip_${message.id}`} openOnClick positionStrategy='fixed'>
        <ul className={classes.messageSettings}>
          <li onClick={() => mutate()}>
            <Trash2Icon />
            <span>Удалить</span>
          </li>
        </ul>
      </Tooltip>
      <div className={classes.messageBlock_content}>
        <Image
          src={process.env.BACK_URL + message.sender.avatar[0].url}
          alt={message.sender.username}
          width={45}
          height={45}
        />
        <div className={classes.messageBlock_text} data-tooltip-id={`messageSettingsTooltip_${message.id}`}>
          <div style={message.audio ? { padding: 0 } : {}}>
            {message.text && <p className={isSearchMessage ? classes.searchMessage__text : ''}>{message.text}</p>}
            {message.audio && <AudioMessage audio={message.audio} />}
            {message.media?.length > 0 && (
              <div className={classes.messageBlock_text__media}>
                {message.media.map((media) => (
                  <ReadUploadAssets key={media.id} uploadAsset={media} />
                ))}
              </div>
            )}
          </div>
          <span>{format(message.createdAt, 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}

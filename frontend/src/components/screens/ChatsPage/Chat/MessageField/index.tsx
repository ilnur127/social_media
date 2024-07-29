'use client';
import { CircleXIcon, MicIcon, PauseIcon, SendIcon, Trash2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useReactMediaRecorder } from 'react-media-recorder';

import { Field, Loader, ReadUploadAssets } from '@/components/ui';
import { useAuth, useReactQuerySubscription } from '@/hooks';
import { fetcher } from '@/utils/fetcher';
import { IAssets } from '@/types/assets.types';
import { IMessage } from '@/types/chat.types';
import { TypeError } from '@/types/error.types';

import classes from './index.module.scss';
import MediaTooltip from './tooltips/mediaTooltip';
import SmilesTooltip from './tooltips/smilesTooltip';

export default function MessageField() {
  const { id } = useParams();
  const { user } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadAssets, setUploadAssets] = useState<IAssets[]>([]);

  const send = useReactQuerySubscription();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({});

  const { mutate } = useMutation<IMessage, TypeError, IAssets | null>({
    mutationKey: ['update chat', id],
    mutationFn: (audioMessage) =>
      fetcher('messages', {
        method: 'POST',
        body: {
          data: {
            text: message,
            sender: user?.id,
            chat: id,
            media: uploadAssets,
            audio: audioMessage,
          },
        },
        isAuth: true,
      }),
    onSuccess: () => {
      setMessage('');
      setUploadAssets([]);
      clearBlobUrl();
      send({
        operation: 'update',
        entity: 'chat',
        id: id.toString(),
        payload: { title: message },
      });
    },
  });

  const uploadAudioMessage = async (mediaBlobUrl: string) => {
    const formData = new FormData();
    console.dir(audioRef.current);
    const data = await fetch(mediaBlobUrl).then((res) => res.blob());
    console.log(data);
    formData.append('files', data);

    return fetch(process.env.API_URL + '/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    }).then((res) => res.json());
  };

  const onSend = async () => {
    let audioMessageAsset: IAssets | null = null;
    if (mediaBlobUrl) {
      audioMessageAsset = await uploadAudioMessage(mediaBlobUrl);
    }
    mutate(audioMessageAsset);
  };

  return (
    <div className={classes.messageBlock}>
      {isLoading && <Loader />}
      {uploadAssets.length > 0 && (
        <div className={classes.messageBlock_media}>
          {uploadAssets.map((uploadAsset) => (
            <div key={uploadAsset.id}>
              {<ReadUploadAssets uploadAsset={uploadAsset} />}
              <button
                onClick={() => {
                  setUploadAssets((old) => old.filter((asset) => asset.id !== uploadAsset.id));
                }}
              >
                <CircleXIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={classes.messageBlock_actions}>
        {mediaBlobUrl ? (
          <button onClick={clearBlobUrl}>
            <Trash2Icon />
          </button>
        ) : (
          <button>
            <MediaTooltip setUploadAssets={setUploadAssets} setIsLoading={setIsLoading} />
          </button>
        )}
        {mediaBlobUrl ? (
          <audio src={mediaBlobUrl} controls ref={audioRef} />
        ) : (
          <Field
            placeholder='Write a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
          />
        )}
        <div className={classes.messageBlock_buttons}>
          <button>
            <SmilesTooltip setMessage={setMessage} />
          </button>
          {mediaBlobUrl || message || uploadAssets.length > 0 ? (
            <button onClick={onSend}>
              <SendIcon />
            </button>
          ) : (
            <button onClick={() => (status === 'recording' ? stopRecording() : startRecording())}>
              {status === 'recording' ? <PauseIcon /> : <MicIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

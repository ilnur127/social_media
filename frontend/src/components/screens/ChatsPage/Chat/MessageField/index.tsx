'use client'
import { CircleXIcon, MicIcon, SendIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { Field, Loader, ReadUploadAssets } from '@/components/ui';
import { useAuth, useReactQuerySubscription } from '@/hooks';
import { fetcher } from '@/utils/fetcher';
import { IAssets } from '@/types/assets.types';

import classes from './index.module.scss';
import MediaTooltip from './tooltips/mediaTooltip';
import SmilesTooltip from './tooltips/smilesTooltip';

export default function MessageField() {
    const { id } = useParams()
    const { user } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [uploadAssets, setUploadAssets] = useState<IAssets[]>([])
    const send = useReactQuerySubscription()

    const { mutate } = useMutation({
        mutationKey: ['update chat', id],
        mutationFn: () => fetcher('messages', {
            method: 'POST',
            body: {
                data: {
                    text: message,
                    sender: user?.id,
                    chat: id,
                    media: uploadAssets
                }
            },
            isAuth: true
        }),
        onSuccess: () => {
            setMessage('')
            setUploadAssets([])
            send({
                operation: 'update',
                entity: 'chat',
                id: id.toString(),
                payload: { title: message}
            })
        }
    })

    const onSend = () => mutate()

    return (
      <div className={classes.messageBlock}>
        {isLoading && <Loader />}
        {uploadAssets.length > 0 && <div className={classes.messageBlock_media}>
            {uploadAssets.map((uploadAsset) =>
                <div key={uploadAsset.id}>
                    {<ReadUploadAssets uploadAsset={uploadAsset} />}
                    <button onClick={() => {
                        setUploadAssets((old) => old.filter(asset => asset.id !== uploadAsset.id));
                    }}><CircleXIcon /></button>
                </div>)
            }
        </div> }
        <div className={classes.messageBlock_actions}>
            <MediaTooltip
                setUploadAssets={setUploadAssets}
                setIsLoading={setIsLoading}
            />
            <Field
                placeholder='Write a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSend()}
            />
            <div className={classes.messageBlock_buttons}>
                <SmilesTooltip setMessage={setMessage} />
                {
                    message || uploadAssets.length > 0  ? <button onClick={onSend}><SendIcon /></button> :
                    <button onClick={onSend}><MicIcon /></button>
                }
            </div>
        </div>
      </div>
    );
  }
  
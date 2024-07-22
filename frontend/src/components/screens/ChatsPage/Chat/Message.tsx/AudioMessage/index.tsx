'use client'
import { AudioLines, PauseIcon, PlayIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { IAssets } from '@/types/assets.types';
import { timeDecode } from '@/utils';

import classes from './index.module.scss';

type TMessageProps = {
    audio: IAssets;
}

export default function AudioMessage({ audio }: TMessageProps) {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ playingTime, setPlayingTime ] = useState('00:00');
  const [ audioDuration, setAudioDuration ] = useState('00:00');
  const [ progress, setProgress ] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
        setPlayingTime('00:00');
        setAudioDuration('00:00');
        setIsPlaying(false)
    }
  }, [])

  return (
    <div className={classes.messageBlock_audio} data-type='audio'>
        <div className={classes.messageBlock_audio__progress} data-type='audio' style={{ width: `${progress}%` }}></div>
        <div className={classes.messageBlock_audio__info}>
            <div className={classes.messageBlock_audio__actions}>
                <button onClick={() => {
                    if (!isPlaying) {
                        audioRef.current?.play()
                    } else {
                        audioRef.current?.pause()
                    }
                    setIsPlaying(old => !old);
                }}>
                    <audio
                        ref={audioRef}
                        onDurationChange={(e) => {
                            const target = e.target as HTMLAudioElement;
                            setAudioDuration(timeDecode({ timestamp: target.duration, type: 'second' }))
                        }}
                        onTimeUpdate={() => {
                            if (audioRef.current) {
                                setProgress((audioRef.current.currentTime/audioRef.current.duration) * 100)
                                setPlayingTime(timeDecode({ timestamp: audioRef.current.currentTime, type: 'second' }))
                            }
                        }}
                        src={process.env.BACK_URL + audio.url}
                    />
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
            </div>
            <AudioLines className={classes.messageBlock_audio__vawe}/>
            <div className={classes.messageBlock_audio__times}>
                {isPlaying ? `${playingTime} / ${audioDuration}`: `${audioDuration}${audio.size ? `, ${audio.size} KB` : ''}`}
            </div>
        </div>
    </div>
  );
}
  
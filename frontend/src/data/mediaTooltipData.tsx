import { CameraIcon, FilesIcon,MusicIcon, VideoIcon } from 'lucide-react';

export const mediaTooltipData = [
  {accept: 'image/*', icon: <CameraIcon />, text: 'Фотографии'},
  {accept: 'video/*', icon: <VideoIcon />, text: 'Видео'},
  {accept: 'file/*', icon: <FilesIcon />, text: 'Документы'},
  {accept: 'audio/*', icon: <MusicIcon />, text: 'Аудиофайл'},
]

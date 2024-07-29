import { FileCheckIcon } from 'lucide-react';
import Image from 'next/image';

import { IAssets } from '@/types/assets.types';

import classes from './index.module.scss';

const readUploadAssets = ({ uploadAsset }: { uploadAsset: IAssets }) => {
  const preFunction = () => {
    switch (uploadAsset.mime.split('/')[0]) {
      case 'image':
        return (
          <Image
            src={process.env.BACK_URL + uploadAsset.url}
            alt={`added media assets`}
            width={100}
            height={75}
            className={classes.image}
          />
        );
      case 'video':
        return (
          <div className={classes.video}>
            <video src={process.env.BACK_URL + uploadAsset.url} controls />
            <small>{uploadAsset.name}</small>
          </div>
        );
      case 'audio':
        return (
          <div className={classes.audio}>
            <small>{uploadAsset.name}</small>
            <audio controls src={process.env.BACK_URL + uploadAsset.url} />
          </div>
        );
      default:
        return (
          <div className={classes.fileLink}>
            <FileCheckIcon />
            <small>{uploadAsset.name}</small>
          </div>
        );
    }
  };

  return (
    <a href={process.env.BACK_URL + uploadAsset.url} target='_blank'>
      {preFunction()}
    </a>
  );
};

export default readUploadAssets;

'use client';
import { ReadUploadAssets } from '@/components/ui';
import { IAssets } from '@/types/assets.types';

import classes from './index.module.scss';

const Applications = ({
  data,
  activeFilter,
}: {
  data: { date: string; mediases?: IAssets[] }[];
  activeFilter: string;
}) => {
  return (
    <div className={classes.applicationsContent}>
      {data
        .filter((groupApplications) =>
          activeFilter ? groupApplications.mediases?.find((media) => media.mime.split('/')[0] === activeFilter) : true,
        )
        .map((groupApplications, index) => (
          <div key={index} className={classes.applicationsContent__item}>
            <h1>{groupApplications.date}</h1>
            <div className={classes.applicationsContent__applications}>
              {groupApplications.mediases
                ?.filter((media) => (activeFilter ? media.mime.split('/')[0] === activeFilter : true))
                .map((media) => <ReadUploadAssets key={media.id} uploadAsset={media} />)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Applications;

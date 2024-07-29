'use client';
import { Dispatch, SetStateAction } from 'react';

import classes from './index.module.scss';

type THeader = { activeFilter: string; setActiveFilter: Dispatch<SetStateAction<string>> };

const Header = ({ activeFilter, setActiveFilter }: THeader) => {
  return (
    <div className={classes.applicationsBlock_header}>
      <h1>Вложения</h1>
      <div className={classes.filtersBlock}>
        {[
          { label: 'Все', value: '' },
          { label: 'Фотографии', value: 'image' },
          { label: 'Видео', value: 'video' },
          { label: 'Документы', value: 'application' },
          { label: 'Аудиозаписи', value: 'audio' },
        ].map((type, index) => (
          <div
            key={index}
            className={activeFilter === type.value ? classes.active : ''}
            onClick={() => setActiveFilter(type.value)}
          >
            {type.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;

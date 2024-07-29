'use client';
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Field } from '@/components/ui';

import classes from './index.module.scss';

type TSearchFieldParams = {
  countFindMessages: number;
  activeFindMessageIndex?: number;
  switchFindMessage: (id?: number) => void;
  findMessagesFn: (searchTerm: string) => void;
};

export default function SearchField({
  countFindMessages,
  activeFindMessageIndex,
  switchFindMessage,
  findMessagesFn,
}: TSearchFieldParams) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      findMessagesFn(searchTerm);
    }
  }, [searchTerm, findMessagesFn]);

  return searchMode ? (
    <div>
      {activeFindMessageIndex !== undefined && countFindMessages ? (
        <div>
          <div className={classes.actions}>
            <ArrowUpIcon
              onClick={() => switchFindMessage(activeFindMessageIndex - 1)}
              className={activeFindMessageIndex === 0 ? classes.actions_disabled : ''}
            />
            <ArrowDownIcon
              onClick={() => switchFindMessage(activeFindMessageIndex + 1)}
              className={activeFindMessageIndex === countFindMessages - 1 ? classes.actions_disabled : ''}
            />
          </div>
          <div>{`${activeFindMessageIndex + 1}/${countFindMessages}`}</div>
        </div>
      ) : (
        <></>
      )}
      <Field
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search chats'
        Icon={SearchIcon}
        type='search'
      />
      <button
        onClick={() => {
          setSearchMode(false);
          switchFindMessage(undefined);
          setSearchTerm('');
        }}
      >
        <XCircleIcon />
      </button>
    </div>
  ) : (
    <button onClick={() => setSearchMode(true)}>
      <SearchIcon />
    </button>
  );
}

'use client';
import { GripHorizontalIcon, User } from 'lucide-react';
import Image from 'next/image';

import { IUser } from '@/types/user.types';
import { getUserAvatarUrl } from '@/utils/getUserAvatarUrl';

import classes from './index.module.scss';
import SearchField from './SearchField';

type TChatHeaderParams = {
  user?: IUser;
  countFindMessages: number;
  activeFindMessageIndex?: number;
  switchFindMessage: (id?: number) => void;
  findMessagesFn: (searchTerm: string) => void;
};

export default function ChatHeader({
  user,
  countFindMessages,
  activeFindMessageIndex,
  switchFindMessage,
  findMessagesFn,
}: TChatHeaderParams) {
  return (
    <div className={classes.userBlock}>
      {user ? (
        <div>
          {user.avatar.length ? (
            <Image src={getUserAvatarUrl(user)} alt={user.username} width='40' height='40' />
          ) : (
            <User />
          )}
          <div className={classes.userBlock_info}>
            <h2>{user.username}</h2>
            <small>{user.position}</small>
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className={classes.buttons}>
        <SearchField
          countFindMessages={countFindMessages}
          activeFindMessageIndex={activeFindMessageIndex}
          switchFindMessage={switchFindMessage}
          findMessagesFn={findMessagesFn}
        />
        <button>
          <GripHorizontalIcon />
        </button>
      </div>
    </div>
  );
}

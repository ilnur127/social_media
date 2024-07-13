'use client'
import { GripHorizontalIcon, SearchIcon, User, XCircleIcon } from 'lucide-react';
import Image from 'next/image';

import { IUser } from '@/types/user.types';
import { getUserAvatarUrl } from '@/utils/getUserAvatarUrl';
import { Field } from '@/components/ui';

import classes from './index.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';

type TChatHeaderParams = {
    user?: IUser;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function ChatHeader({ user, searchTerm, setSearchTerm }: TChatHeaderParams) {
  const [searchMode, setSearchMode] = useState(false);

  return (
    <div className={classes.userBlock}>
        {user ? <div>
            {user.avatar.length ?
                <Image
                    src={getUserAvatarUrl(user)}
                    alt={user.username}
                    width='40'
                    height='40'
                />
            : <User />}
            <div className={classes.userBlock_info}>
                <h2>{user.username}</h2>
                <small>{user.position}</small>
            </div>
        </div> : <div />}
        <div className={classes.buttons}>
            {
                searchMode ?
                    <div>
                        <Field
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search chats'
                            Icon={SearchIcon}
                            type='search'
                        />
                        <button onClick={() => setSearchMode(false)}><XCircleIcon /></button>
                    </div>
                : <button onClick={() => setSearchMode(true)}><SearchIcon /></button>
            }
            <button><GripHorizontalIcon /></button>
        </div>
    </div>
  );
}
  
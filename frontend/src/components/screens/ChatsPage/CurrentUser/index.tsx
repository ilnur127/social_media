'use client'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ExternalLinkIcon, User } from 'lucide-react';

import classes from './index.module.scss';
import Image from 'next/image';
import { useProfile } from '@/hooks';
import { getUserAvatarUrl } from '@/utils/getUserAvatarUrl';

export default function CurrentUser() {
  const { data } = useProfile()

  return (
    <div className={classes.mainBlock}>
      {data ? (
        <div className={classes.userBlock}>
          <div>
            {data.avatar?.length ?
              <Image
                src={getUserAvatarUrl(data)}
                alt={data.username}
                width='60'
                height='60'
              />
            : <User />}
            <div className={classes.userBlock_info}>
              <h2>{data.username}</h2>
              <small>{data.position}</small>
            </div>
          </div>
          <ExternalLinkIcon style={{ cursor: 'pointer' }} onClick={() => signOut({ callbackUrl: "/" })} />
        </div>
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </div>
  );
}
  
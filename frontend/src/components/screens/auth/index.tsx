'use client';
import { AtSign, KeyRound, User2Icon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { Button, Field } from '@/components/ui';
import { useAuth } from '@/hooks';

import classes from './index.module.scss';

interface IAuth {
  type?: 'login' | 'register';
}
export default function AuthComponent({ type }: IAuth) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const params: Record<string, any> = {
      email: formData.get('email'),
      password: formData.get('password'),
      type,
      redirect: false,
    };

    if (type === 'register') {
      params['username'] = formData.get('username');
      params['position'] = formData.get('position');
    }

    const res = await signIn('credentials', params);
    setIsLoading(false);

    if (res && !res.error) {
      router.push('/');
    } else {
      toast.error(res?.error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className={classes.authBlock}>
      <form onSubmit={onSubmit}>
        <h1>{type}</h1>
        {type === 'register' && (
          <>
            <Field placeholder='Enter name' type='text' name='username' required Icon={User2Icon} />
            <Field placeholder='Enter position' type='text' name='position' required Icon={User2Icon} />
          </>
        )}
        <Field placeholder='Enter email' type='email' name='email' required Icon={AtSign} />
        <Field placeholder='Enter password' type='password' name='password' required Icon={KeyRound} />

        <Button isLoading={isLoading} disabled={isLoading} type='submit'>
          {type}
        </Button>
        {type === 'login' && (
          <Link href={'/register'}>
            <small>Зарегестрироваться</small>
          </Link>
        )}
      </form>
    </div>
  );
}

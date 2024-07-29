'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // todo добавить js cookie
    if (isLoggedIn) {
      window.localStorage.setItem('token', user?.jwt || '');
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && !(pathname == '/login' || pathname == '/register')) {
      router.push('/login');
    }
  }, [pathname, isLoggedIn, router]);

  return <>{children}</>;
};

export default AuthProvider;

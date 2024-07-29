import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { IUser } from '@/types/user.types';
import { fetcher } from '@/utils/fetcher';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        username: { label: 'name', type: 'text', required: true },
        type: { label: 'type', type: 'text', required: true },
        position: { label: 'position', type: 'text', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          let currentUser;

          if (credentials.type === 'login') {
            currentUser = await fetcher<{ user: IUser; jwt: string; error: any }>('auth/local', {
              method: 'POST',
              body: {
                identifier: credentials.email,
                password: credentials.password,
              },
            });
          } else {
            currentUser = await fetcher<{ user: IUser; jwt: string; error: any }>('auth/local/register', {
              method: 'POST',
              body: {
                username: credentials.username,
                email: credentials.email,
                position: credentials.position,
                password: credentials.password,
              },
            });
          }

          const userAllInfo = await fetcher<IUser>(`users/${currentUser.user.id}?populate[avatar]=*`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${currentUser.jwt}` },
          });

          if (currentUser.user && !currentUser.error) {
            return {
              ...userAllInfo,
              jwt: currentUser.jwt,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.position = user.position;
        token.jwt = user.jwt;
        token.avatar = user.avatar;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as number;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.position = token.position as string;
        session.user.jwt = token.jwt as string;
        session.user.avatar = token.avatar as { url: string; id: number }[];
      }
      return session;
    },
  },
};

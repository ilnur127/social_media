'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchIcon } from 'lucide-react';

import { IUser } from '@/types/user.types';
import { fetcher } from '@/utils/fetcher';
import { useAuth, useDebounce } from '@/hooks';
import { Field, UsersGridCard } from '@/components/ui';

import classes from './index.module.scss';

export default function SearchPeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', debouncedSearchTerm],
    queryFn: () =>
      fetcher<IUser[]>(
        `users?populate[avatar]=*&populate[friends]=*&populate[chats][populate]=*&populate[blockedPeople][populate]=*&filters[email][$ne]=${user?.email}&filters[$or][0][username][$contains]=${debouncedSearchTerm}`,
        { method: 'GET', isAuth: true },
      ),
  });

  return (
    <div className={classes.searchPeopleBlock}>
      <div className={classes.searchPeopleBlock_searchInput}>
        <Field
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search user'
          Icon={SearchIcon}
          type='search'
        />
      </div>
      {data && Array.isArray(data) && data.length > 0 ? (
        <UsersGridCard users={data} isLoading={isLoading} refetch={refetch} />
      ) : (
        <p>People not found</p>
      )}
    </div>
  );
}

import { Metadata } from 'next';

import SearchPeoplePage from '@/components/screens/SearchPeoplePage';

export const metadata: Metadata = {
  title: 'Friends page',
  description: '',
};

export default function Friends() {
  return <SearchPeoplePage />;
}

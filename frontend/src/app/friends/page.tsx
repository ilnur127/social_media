import { Metadata } from 'next';

import FriendsPage from '@/components/screens/FriendsPage';

export const metadata: Metadata = {
  title: 'Friends page',
  description: '',
};

export default function Friends() {
  return <FriendsPage />;
}

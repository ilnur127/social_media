import { Metadata } from 'next';

import AuthComponent from '@/components/screens/auth';

export const metadata: Metadata = {
  title: 'Login',
};
export default function LoginPage() {
  return <AuthComponent type='login' />;
}

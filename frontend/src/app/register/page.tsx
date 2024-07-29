import { Metadata } from 'next';

import AuthComponent from '@/components/screens/auth';

export const metadata: Metadata = {
  title: 'Register',
};
export default function RegisterPage() {
  return <AuthComponent type='register' />;
}

import { Metadata } from 'next';
import EditUserWrapper from './EditUserWrapper';

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Edit user details'
};

export default function EditUserPage() {
  return <EditUserWrapper />;
}

export const dynamic = 'force-dynamic';

'use client';

import EditUserForm from '@/components/forms/UserForm/EditUserForm';

export default function EditUserClient({ userId }: { userId: string }) {
  return <EditUserForm userId={userId} />;
}

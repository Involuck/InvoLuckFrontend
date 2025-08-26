'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditUserForm from '@/components/forms/UserForm/EditUserForm';

export default function EditUserWrapper() {
  const params = useParams();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      setUserId(id || '');
    }
  }, [params?.id]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return <EditUserForm userId={userId} />;
}

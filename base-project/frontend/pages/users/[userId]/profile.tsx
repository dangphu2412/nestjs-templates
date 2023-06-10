import React, { ReactElement } from 'react';
import { ContentLayout } from '@/modules/shared/components/Box';
import { ContentHeader } from '@/modules/shared/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function UserProfile(): ReactElement {
  const {
    query: { userId }
  } = useRouter();

  return (
    <ContentLayout>
      <ContentHeader main={'Profile'} brief={'User information'} />

      <Link href={`/users/${userId}/role-settings`}>Go to role settings</Link>
    </ContentLayout>
  );
}

import React, { ReactElement } from 'react';
import { ContentLayout } from '@/modules/shared/components/Box';
import { AccessControlList } from '@/modules/user/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}

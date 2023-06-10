import React, { ReactElement } from 'react';
import { ContentLayout } from '@/modules/shared/components/Box';
import { ContentHeader } from '@/modules/shared/components/Header';
import { RoleSettings } from '@/modules/user/components/RoleSettings/RoleSettings';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}

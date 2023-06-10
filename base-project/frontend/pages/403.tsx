import React from 'react';
import { NoLayout } from '@/modules/shared/components/NoLayout';
import { NextPageWithLayout } from '@/modules/system/infrastructure/next.types';
const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>403: Abort access</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;

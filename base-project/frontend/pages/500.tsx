import React from 'react';
import { NoLayout } from '@/modules/shared/components/NoLayout';
import { NextPageWithLayout } from '@/modules/system/infrastructure/next.types';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>System maintenance</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;

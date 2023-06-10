import { MonthlyConfig } from '@/modules/monthly-money/types/monthly-config.types';

export type OperationFee = {
  id: number;
  paidMoney: number;
  userId: string;
  monthlyConfig: MonthlyConfig;
};

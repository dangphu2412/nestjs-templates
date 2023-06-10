import { MonthlyMoneyApiClient } from '@/modules/monthly-money/services';
import { useQuery } from 'react-query';

type Props = {
  isEnabled: boolean;
};

export function useQueryMonthlyMoneyConfigs({ isEnabled = true }: Props) {
  return useQuery({
    queryFn: MonthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false,
    enabled: isEnabled
  });
}

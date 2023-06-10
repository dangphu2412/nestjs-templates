import { useMutation } from 'react-query';
import { MonthlyMoneyApiClient } from '@/modules/monthly-money/services';
import { PatchUserPaidMoneyRequest } from '@/modules/monthly-money/clients/monthly-money.types';

export function useMutateUpdatePaidMoney() {
  const { mutate } = useMutation({
    mutationFn: (request: PatchUserPaidMoneyRequest) =>
      MonthlyMoneyApiClient.updatePaidMoney(request),
    mutationKey: 'MUTATION_UPDATE_PAID'
  });

  return { mutate };
}

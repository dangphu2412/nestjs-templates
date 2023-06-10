export type MonthlyMoneyConfig = {
  id: number;
  amount: number;
  monthRange: number;
};

export type PatchUserPaidMoneyRequest = {
  userId: string;
  operationFeeId: number;
  newPaid: number;
};

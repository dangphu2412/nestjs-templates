import React, { useState } from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '@/modules/user/models/user.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faClose,
  faMinusCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import classNames from 'classnames';
import { useMutateUpdatePaidMoney } from '@/modules/user/hooks/data/useMutateUpdatePaidMoney';
import { OperationFee } from '@/modules/monthly-money/types';
import classes from './Cell.module.scss';
import { useNotify } from '@/modules/shared/hooks/useNotify.hook';

export function PaidCell({
  row
}: CellProps<UserManagementView, string>): React.ReactElement {
  const isMember = !!row.original.operationFee;
  const paidMoney = row.original?.operationFee?.paidMoney ?? 0;
  const amountPerChange = row.original?.operationFee?.monthlyConfig.amount;
  const monthRange = row.original?.operationFee?.monthlyConfig.monthRange;

  const [currentPaid, setCurrentPaid] = useState(paidMoney);

  const notify = useNotify();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: updatePaidMoney } = useMutateUpdatePaidMoney();

  function handlePaidIncrease() {
    const newPaid = currentPaid + (amountPerChange as number);
    const isExceedMaxLimit =
      (monthRange as number) * (amountPerChange as number) < newPaid;

    if (isExceedMaxLimit) {
      notify({
        title:
          'You can not increase more paid money. It has exceed the max limit'
      });
      return;
    }

    onOpen();

    setCurrentPaid(newPaid);
  }

  function handlePaidDecrease() {
    const isExceedMinLimit = currentPaid < 0;

    if (isExceedMinLimit) {
      return;
    }

    onOpen();

    const newPaid = currentPaid - (amountPerChange as number);

    setCurrentPaid(Math.max(newPaid, 0));
  }

  function handleSavePaid() {
    updatePaidMoney(
      {
        userId: row.original.id,
        newPaid: currentPaid,
        operationFeeId: (row.original.operationFee as OperationFee).id
      },
      {
        onSuccess: () => {
          notify({
            title: `Update paid money of user: ${row.original.username} success`,
            status: 'success'
          });
        },
        onError: () => {
          notify({
            title: `Update paid money of user: ${row.original.username} failed`,
            status: 'error'
          });

          setCurrentPaid(paidMoney);
        }
      }
    );

    onClose();
  }

  function handleRemoveChange() {
    setCurrentPaid(paidMoney);

    onClose();
  }

  return (
    <>
      {isMember ? (
        <Popover isOpen={isOpen}>
          <PopoverTrigger>
            <div className="space-x-2">
              <span
                role="presentation"
                onClick={handlePaidDecrease}
                className={classes['cell-paid']}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
              </span>

              <span>{currentPaid}</span>

              <span
                role="presentation"
                onClick={handlePaidIncrease}
                className={classes['cell-paid']}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent width="auto" outline="none">
            <PopoverBody className="space-x-4">
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faCheck}
                onClick={handleSavePaid}
              />

              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faClose}
                onClick={handleRemoveChange}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <span className={classNames(classes['cell-status'], 'bg-success')}>
          New Member
        </span>
      )}
    </>
  );
}

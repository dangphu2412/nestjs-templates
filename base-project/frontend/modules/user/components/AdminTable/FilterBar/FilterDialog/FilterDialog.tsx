import React, { ReactNode } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader
} from '@chakra-ui/react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMemberType,
  selectJoinedInDates
} from '@/modules/user/store/user.selector';
import { userActions } from '@/modules/user/store/user.slice';
import { DatePicker } from '@/modules/shared/components/Input/DatePicker/DatePicker';
import { MemberType } from '@/modules/user/constants/admin-management.constants';
import styles from './FilterDialog.module.scss';

type FilterItem = {
  key: string;
  value: ReactNode;
};

type Props = {
  closePopoverCallback(): void;
};

enum FilterTab {
  JOIN_DATE_RANGE = 'JOIN_DATE_RANGE',
  MEMBER_TYPE = 'MEMBER_TYPE'
}

export function FilterDialog({
  closePopoverCallback
}: Props): React.ReactElement {
  const dispatch = useDispatch();
  const [activeTabKey, setActiveTabKey] = React.useState(
    FilterTab.JOIN_DATE_RANGE
  );
  const tabs: FilterItem[] = [
    {
      key: FilterTab.JOIN_DATE_RANGE,
      value: 'Join date'
    },
    {
      key: FilterTab.MEMBER_TYPE,
      value: 'Member type'
    }
  ];

  const {
    value: { fromDate, toDate }
  } = useSelector(selectJoinedInDates);
  const { value: memberType } = useSelector(selectMemberType);

  function handleTabClick(key: string) {
    setActiveTabKey(key as FilterTab);
  }

  function handleClearFilter() {
    dispatch(userActions.resetFilter());
  }

  function handleApplyFilter() {
    closePopoverCallback();
  }

  function handleFromDateChange(date: Date) {
    dispatch(
      userActions.setFilter({
        joinedIn: {
          fromDate: date.toString(),
          toDate
        }
      })
    );
  }

  function handleToDateChange(date: Date) {
    dispatch(
      userActions.setFilter({
        joinedIn: {
          fromDate,
          toDate: date.toString()
        }
      })
    );
  }

  function handleIndebtedChange() {
    if (memberType === MemberType.DEBTOR) {
      dispatch(
        userActions.setFilter({
          memberType: ''
        })
      );

      return;
    }

    dispatch(
      userActions.setFilter({
        memberType: MemberType.DEBTOR
      })
    );
  }

  return (
    <>
      <PopoverHeader>Filter</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Flex className="space-x-4 my-2">
          <Flex flexDirection="column" width="full">
            {tabs.map(tab => {
              return (
                <button
                  type="button"
                  className={classNames(
                    styles.tab,
                    activeTabKey === tab.key && styles['tab-active']
                  )}
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                >
                  {tab.value}
                </button>
              );
            })}
          </Flex>

          <FormControl className="pr-4 space-y-4">
            {activeTabKey === FilterTab.JOIN_DATE_RANGE && (
              <>
                <FormControl>
                  <FormLabel>From date</FormLabel>
                  <DatePicker
                    value={fromDate ? new Date(fromDate) : new Date()}
                    onDateChange={handleFromDateChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>To date</FormLabel>
                  <DatePicker
                    value={toDate ? new Date(toDate) : new Date()}
                    onDateChange={handleToDateChange}
                  />
                </FormControl>
              </>
            )}

            {activeTabKey === FilterTab.MEMBER_TYPE && (
              <Checkbox
                checked={memberType === MemberType.DEBTOR}
                onChange={handleIndebtedChange}
              >
                Indebted
              </Checkbox>
            )}
          </FormControl>
        </Flex>
      </PopoverBody>
      <PopoverFooter>
        <Button onClick={handleClearFilter}>Clear</Button>

        <Button onClick={handleApplyFilter} float="right">
          Apply
        </Button>
      </PopoverFooter>
    </>
  );
}

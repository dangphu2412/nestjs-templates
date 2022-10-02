import React, { ReactNode } from 'react';
import {
  Button,
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
import { selectInactiveDates } from '@modules/user/store/user.selector';
import { userActions } from '@modules/user/store/user.slice';
import { DatePicker } from '@modules/shared/components/Input/DatePicker/DatePicker';
import styles from './FilterDialog.module.scss';

type FilterItem = {
  key: string;
  value: ReactNode;
};

type Props = {
  closePopoverCallback(): void;
};

enum FilterTab {
  INACTIVE_DATE = 'INACTIVE_DATE',
  CITY = 'CITY'
}

export function FilterDialog({
  closePopoverCallback
}: Props): React.ReactElement {
  const dispatch = useDispatch();
  const [activeTabKey, setActiveTabKey] = React.useState(
    FilterTab.INACTIVE_DATE
  );
  const tabs: FilterItem[] = [
    {
      key: FilterTab.INACTIVE_DATE,
      value: 'Inactive date'
    },
    {
      key: FilterTab.CITY,
      value: 'City'
    }
  ];
  const {
    value: { from, to }
  } = useSelector(selectInactiveDates);

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
        disabledIn: {
          from: date.toString(),
          to
        }
      })
    );
  }

  function handleToDateChange(date: Date) {
    dispatch(
      userActions.setFilter({
        disabledIn: {
          from,
          to: date.toString()
        }
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
            {activeTabKey === FilterTab.INACTIVE_DATE && (
              <>
                <FormControl>
                  <FormLabel>From date</FormLabel>
                  <DatePicker
                    value={from ? new Date(from) : new Date()}
                    onDateChange={handleFromDateChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>To date</FormLabel>
                  <DatePicker
                    value={to ? new Date(to) : new Date()}
                    onDateChange={handleToDateChange}
                  />
                </FormControl>
              </>
            )}

            {activeTabKey === FilterTab.CITY && <>City tab</>}
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

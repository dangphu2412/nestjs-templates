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
import { DatePicker } from '../../../../../shared/components/Input/DatePicker/DatePicker';
import styles from './FilterDialog.module.scss';

type FilterItem = {
  key: string;
  value: ReactNode;
};

type Props = {
  closePopoverCallback(): void;
};

export function FilterDialog({
  closePopoverCallback
}: Props): React.ReactElement {
  const [activeTabKey, setActiveTabKey] = React.useState('INACTIVE_DATE');
  const tabs: FilterItem[] = [
    {
      key: 'INACTIVE_DATE',
      value: 'Inactive date'
    },
    {
      key: 'CITY',
      value: 'City'
    }
  ];

  function handleTabClick(key: string) {
    setActiveTabKey(key);
  }

  function handleApplyFilter() {
    closePopoverCallback();
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
            {activeTabKey === 'INACTIVE_DATE' && (
              <>
                <FormControl>
                  <FormLabel>From date</FormLabel>
                  <DatePicker />
                </FormControl>

                <FormControl>
                  <FormLabel>To date</FormLabel>
                  <DatePicker />
                </FormControl>
              </>
            )}

            {activeTabKey === 'CITY' && <>City tab</>}
          </FormControl>
        </Flex>
      </PopoverBody>
      <PopoverFooter>
        <Button onClick={handleApplyFilter} float="right">
          Apply
        </Button>
      </PopoverFooter>
    </>
  );
}

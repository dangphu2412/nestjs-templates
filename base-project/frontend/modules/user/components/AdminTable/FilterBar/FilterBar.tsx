import React from 'react';
import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from './FilterBar.module.scss';
import { FilterDialog } from './FilterDialog/FilterDialog';

export function FilterBar(): React.ReactElement {
  const [currentSearch, setCurrentSearch] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
  }

  function onSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setCurrentSearch('');
    }
  }

  return (
    <Flex className="pb-2 space-x-2" justifyContent="space-between">
      <Input
        placeholder="Search by username"
        value={currentSearch}
        className={styles['search-input']}
        onChange={onSearchChange}
        onKeyDown={onSearchPress}
      />

      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Button>
            <FontAwesomeIcon className="pr-2" icon={faFilter} />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <FilterDialog closePopoverCallback={onClose} />
        </PopoverContent>
      </Popover>

      <Button>Search</Button>
    </Flex>
  );
}

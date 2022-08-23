import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from './FilterBar.module.scss';
import { FilterDialog } from './FilterDialog/FilterDialog';

export function FilterBar(): React.ReactElement {
  const [isFilterOpened, setIsFilterOpened] = React.useState(false);
  const [currentSearch, setCurrentSearch] = React.useState('');

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
  }

  function onSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setCurrentSearch('');
    }
  }

  function toggleFilterDialog() {
    setIsFilterOpened(preState => !preState);
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

      <Button onClick={toggleFilterDialog}>
        <FontAwesomeIcon className="pr-2" icon={faFilter} />
        Filter
      </Button>
      {isFilterOpened && <FilterDialog />}

      <Button>Search</Button>
    </Flex>
  );
}

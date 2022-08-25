import React from 'react';
import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { userActions } from '@modules/user/store/user.slice';
import { SearchInput } from '@modules/user/components/AdminTable/FilterBar/SearchInput/SearchInput';
import { FilterDialog } from './FilterDialog/FilterDialog';

export function FilterBar(): React.ReactElement {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmitFilter() {
    dispatch(userActions.setIsSubmitted(true));
  }

  return (
    <Flex className="pb-2 space-x-2" justifyContent="space-between">
      <SearchInput />

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

      <Button onClick={handleSubmitFilter}>Search</Button>
    </Flex>
  );
}

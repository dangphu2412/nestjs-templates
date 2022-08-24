import React from 'react';
import { Portal } from '@chakra-ui/react';
import styles from './FilterDialog.module.scss';

type Props = {
  filterButtonRef: React.RefObject<HTMLElement>;
};

export function FilterDialog({ filterButtonRef }: Props): React.ReactElement {
  return (
    <Portal containerRef={filterButtonRef}>
      <div className={styles['dialog-wrapper']}>Content</div>
    </Portal>
  );
}

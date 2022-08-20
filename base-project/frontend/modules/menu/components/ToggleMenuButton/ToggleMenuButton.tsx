import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './ToggleMenuButton.module.scss';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isMenuHidden: boolean;
};

export function ToggleMenuButton({
  className,
  isMenuHidden,
  ...rest
}: Props): React.ReactElement {
  return (
    <div
      className={`${styles['btn-wrapper']} ${
        isMenuHidden
          ? styles['btn-stick-to-header']
          : styles['btn-stick-to-sidebar']
      } ${className ?? ''}`}
      {...rest}
    >
      <FontAwesomeIcon icon={isMenuHidden ? faBars : faAnglesLeft} />
    </div>
  );
}

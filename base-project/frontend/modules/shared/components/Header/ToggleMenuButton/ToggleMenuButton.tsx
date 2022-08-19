import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

export function ToggleMenuButton({
  className,
  ...rest
}: Omit<FontAwesomeIconProps, 'icon'>): React.ReactElement {
  return (
    <>
      <FontAwesomeIcon
        icon={faBarsStaggered}
        className={`cursor-pointer ${className || ''}`}
        {...rest}
      />
    </>
  );
}

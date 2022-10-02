import { Audio } from 'react-loader-spinner';
import React from 'react';
import classes from './FullLoader.module.scss';

type FullLoaderProps = {
  isLoading?: boolean;
};

export function FullLoader(props: FullLoaderProps): React.ReactElement {
  return (
    <>
      {props.isLoading && (
        <div className={classes['loader-wrapper']}>
          <Audio height="100" width="100" color="grey" ariaLabel="loading" />
        </div>
      )}
    </>
  );
}

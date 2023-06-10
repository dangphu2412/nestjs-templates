import React from 'react';
import { UserContext, UserContextState } from './user.context';

export function useUser(): UserContextState {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('No User Context found');
  }

  return context;
}

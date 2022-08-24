import React from 'react';
import { UserContext } from './user.context';
import { User } from '../../models/user.type';

export function useUser(): User | undefined {
  return React.useContext(UserContext).state;
}

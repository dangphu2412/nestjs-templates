import { useContext } from 'react';
import { UserContext } from './user.context';

export function useUser() {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('Missing provider of UserContext');
  }

  return ctx;
}

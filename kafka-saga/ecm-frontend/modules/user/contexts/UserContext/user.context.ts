import { createContext } from 'react';
import { User } from '../../models/user.type';
import { noop } from '../../../shared/utils/noop';
import { ContextWithDispatcher } from '../../../shared/clients/context.api';

export type UserContextState = ContextWithDispatcher<User | null, User>;

export const UserContext = createContext<UserContextState>({
  state: null,
  dispatch: noop
});

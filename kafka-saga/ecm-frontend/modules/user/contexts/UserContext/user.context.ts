import { createContext } from 'react';
import { User } from '../../models/user.type';
import { noop } from '../../../shared/utils/noop';
import { ContextWithDispatcher } from '../../../shared/clients/context.api';

export type UserContextState = ContextWithDispatcher<User, User>;

export const initialUserCtxState: User = {
  id: '',
  username: '',
  avatar: '',
  email: '',
  createdAt: '',
  deletedAt: ''
};

export const UserContext = createContext<UserContextState>({
  state: initialUserCtxState,
  dispatch: noop
});

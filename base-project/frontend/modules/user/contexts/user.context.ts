import { createContext } from 'react';
import { User } from '../models/user.type';
import { noop } from '../../shared/utils/noop';

interface UserContextState {
  state: User;
  dispatch: (user: User) => void;
}

export const initialUserCtxState = {
  username: '',
  id: ''
};

export const UserContext = createContext<UserContextState>({
  state: initialUserCtxState,
  dispatch: noop
});

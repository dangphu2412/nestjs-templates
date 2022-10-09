import React, { PropsWithChildren } from 'react';
import { initialUserCtxState, UserContext } from './user.context';
import { User } from '../../models/user.type';

type UserProviderProps = PropsWithChildren<{}>;

export function UserProvider(props: UserProviderProps): React.ReactElement {
  const [user, setUser] = React.useState<User>(initialUserCtxState);

  return (
    <UserContext.Provider
      value={{
        state: user,
        dispatch: setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

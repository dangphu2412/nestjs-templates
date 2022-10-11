import React, { PropsWithChildren } from 'react';
import { UserContext } from './user.context';
import { User } from '../../models/user.type';

type UserProviderProps = PropsWithChildren<{}>;

export function UserProvider(props: UserProviderProps): React.ReactElement {
  const [user, setUser] = React.useState<User | null>(null);

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

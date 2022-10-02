import React from 'react';
import { useQuery } from 'react-query';
import { ApiClient } from '../modules/shared/services/api-client';

function fetchRoles() {
  return ApiClient.get<Roles, unknown>('/roles');
}

type Roles = {
  id: string;
  key: string;
}[];

export default function TestPage(): React.ReactElement {
  const { refetch, status, data } = useQuery('GET_ROLE', {
    queryFn: fetchRoles,
    cacheTime: 5000
  });

  const { data: anotherData } = useQuery('GET_ROLE', {
    queryFn: fetchRoles
  });

  if (status === 'loading') return <>Loading ...</>;

  return (
    <>
      <div>Hello</div>

      <div>
        {data?.map(item => {
          return (
            <>
              <div>{item.key}</div>
            </>
          );
        })}
      </div>
      <div>
        {anotherData?.map(item => {
          return (
            <>
              <div>{item.key}</div>
            </>
          );
        })}
      </div>

      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => refetch()}>Do Fetch</button>
    </>
  );
}

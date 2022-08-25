import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminState } from '@modules/user/store/user.selector';
import { toFilterQuery } from '@modules/shared/common/filter/filter.mapper';
import { toPagination } from '@modules/shared/common/pagination/pagination.mapper';
import { userActions } from '@modules/user/store/user.slice';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryUsers() {
  const dispatch = useDispatch();
  const { isSubmitted, filters, pagination } = useSelector(selectAdminState);

  const { data } = useQuery(
    [
      'QUERY_USERS',
      pagination.page,
      pagination.size,
      filters.query.value,
      filters.disabledIn.value.from,
      filters.disabledIn.value.to
    ],
    {
      queryFn: () =>
        UserApiClient.getMany({
          filters: toFilterQuery(filters),
          pagination: toPagination(pagination.page, pagination.size)
        }),
      enabled: isSubmitted,
      onSuccess() {
        dispatch(userActions.setIsSubmitted(false));
      }
    }
  );

  return { data };
}

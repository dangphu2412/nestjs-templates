import { ExtractNewEmailsDto } from '@/modules/user/models/user.type';
import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

type QueryExtractNewEmailsProps = {
  params: ExtractNewEmailsDto;
  isEnabled?: boolean;
};

export function useQueryExtractNewEmails({
  params,
  isEnabled
}: QueryExtractNewEmailsProps) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_EXTRACT_NEW_EMAILS',
    queryFn: () => UserApiClient.extractNewEmails(params),
    enabled: isEnabled
  });

  return { data, isLoading, isSuccess };
}

import { User } from '../user.entity';

export const UserServiceIT = 'UserServiceIT';

export interface UserService {
  find(): Promise<User[]>;
}

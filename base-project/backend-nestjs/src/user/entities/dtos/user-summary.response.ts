import { User } from '../user.entity';

export type UserSummary = Omit<User, 'password' | 'roles'>;

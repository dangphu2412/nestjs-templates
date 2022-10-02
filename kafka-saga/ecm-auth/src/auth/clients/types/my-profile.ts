import { User } from '../../../user';

export type MyProfile = Pick<User, 'id' | 'username'>;

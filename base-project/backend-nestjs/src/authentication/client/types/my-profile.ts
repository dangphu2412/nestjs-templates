import { User } from '../../../user/client/entities/user.entity';

export type MyProfile = Pick<User, 'id' | 'username'>;

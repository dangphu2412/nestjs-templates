import { User } from '../../user/entities/user.entity';

export type MyProfile = Pick<User, 'id' | 'username'>;

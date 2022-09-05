import { User } from '../entities/user.entity';

export type UserManagementView = Omit<User, 'password' | 'roles'>[];

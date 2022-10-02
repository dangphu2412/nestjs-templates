import { EntityRepository, Repository } from 'typeorm';
import { User } from '../client/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

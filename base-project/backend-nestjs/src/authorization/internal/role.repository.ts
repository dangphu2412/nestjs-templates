import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../client';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}

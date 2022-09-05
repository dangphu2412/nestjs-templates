import { RoleRepository } from './role.repository';
import { In } from 'typeorm';
import { RoleDef } from './constants/role-def.enum';
import { Injectable } from '@nestjs/common';
import { Role, RoleService } from '../client';

@Injectable()
export class RoleServiceImpl implements RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  getNewUserRoles(): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        key: In([RoleDef.VISITOR]),
      },
    });
  }
}

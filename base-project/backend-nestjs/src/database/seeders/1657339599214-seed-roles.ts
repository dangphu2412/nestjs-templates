import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../../authorization';

export class SeedRoles1657339599214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    await roleRepository.insert([
      {
        name: 'Admin',
        key: 'ADMIN',
        description: '',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    await roleRepository.delete({
      key: In(['ADMIN']),
    });
  }
}

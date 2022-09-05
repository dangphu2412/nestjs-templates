import { MigrationInterface, QueryRunner } from 'typeorm';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../authorization';
import { ModuleConfig } from '../../shared/services/module-config';
import { User } from '../../user';

export class SeedUsers1657339686264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const roleRepository = queryRunner.manager.getRepository(Role);

    const adminRole = await roleRepository.findOne({
      where: {
        key: 'ADMIN',
      },
    });
    const bcryptService = new BcryptService(
      new ModuleConfig(new ConfigService<Record<string, unknown>, false>()),
    );
    const password = await bcryptService.hash('test123');
    const user = new User();
    user.email = 'test@gmail.com';
    user.username = 'test';
    user.password = password;
    user.roles = [adminRole];
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    await userRepository.delete({
      username: 'test',
    });
  }
}

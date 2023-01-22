import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../user';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { ModuleConfig } from '../../shared/services/module-config';
import { ConfigService } from '@nestjs/config';

export class SeedDummyUserTestIndex1674119174562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!process.env['ENABLED_TEST_INDEX']) {
      return;
    }

    const bcryptService = new BcryptService(
      new ModuleConfig(new ConfigService<Record<string, unknown>, false>()),
    );
    const password = await bcryptService.hash('test123');
    const userRepository = queryRunner.manager.getRepository(User);

    const users: User[] = [];

    for (let i = 0; i < 5_000; i++) {
      const user = new User();
      user.email = `test${i}@gmail.com`;
      user.username = `test${i}`;
      user.password = password;
      users.push(user);
    }

    await userRepository.save(users, {
      chunk: 500,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!process.env['ENABLED_TEST_INDEX']) {
      return;
    }

    await queryRunner.query(`TRUNCATE TABLE users`);
  }
}

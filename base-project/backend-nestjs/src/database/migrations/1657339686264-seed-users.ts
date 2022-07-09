import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BcryptService } from '../../shared/bcrypt.service';
import { ConfigService } from '@nestjs/config';

export class SeedUsers1657339686264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const bcryptService = new BcryptService(
      new ConfigService<Record<string, unknown>, false>(),
    );
    const password = await bcryptService.hash('test123');

    await userRepository.insert([
      {
        username: 'test',
        email: 'test@gmail.com',
        password,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    await userRepository.delete({
      username: 'test',
    });
  }
}

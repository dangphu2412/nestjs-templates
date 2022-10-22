import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { Film } from '../../films/clients/entities/film.entity';
import { SlugGenerator } from '../../utils/slug-generator.utils';
import { ShowType } from '../../films/internal/constants/show-type.enum';

export class SeedFilms1666435068996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filmRepository = queryRunner.manager.getRepository(Film);

    await filmRepository.insert([
      {
        title: '6/45',
        slug: SlugGenerator.generate('6/45'),
        thumbnail:
          'https://cdn.galaxycine.vn/media/2022/9/14/1200wx1800h_1663128392583.jpg',
        showTypes: [ShowType.TwoD],
        premiereDate: new Date(),
        timeRange: '120m',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const filmRepository = queryRunner.manager.getRepository(Film);

    await filmRepository.delete({
      title: In(['6/45']),
    });
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmsTable1665066053825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'films',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'time_range',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'premiere_date',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'show_types',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('films');
  }
}

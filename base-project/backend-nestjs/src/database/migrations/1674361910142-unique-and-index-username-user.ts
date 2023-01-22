import {
  MigrationInterface,
  QueryRunner,
  TableIndex,
  TableUnique,
} from 'typeorm';

export class UniqueAndIndexUsernameUser1674361910142
  implements MigrationInterface
{
  private UNIQUE_USERNAME_KEY = 'UQ_users_username_key';
  private UNIQUE_EMAIL_KEY = 'UQ_users_email_key';
  private INDEX_USERNAME_KEY = 'IDX_users_username_key';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraints('users', [
      new TableUnique({
        name: this.UNIQUE_USERNAME_KEY,
        columnNames: ['username'],
      }),
      new TableUnique({
        name: this.UNIQUE_EMAIL_KEY,
        columnNames: ['email'],
      }),
    ]);

    await queryRunner.createIndices('users', [
      new TableIndex({
        name: this.INDEX_USERNAME_KEY,
        columnNames: ['username'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraints('users', [
      new TableUnique({
        name: this.UNIQUE_USERNAME_KEY,
        columnNames: ['username'],
      }),
      new TableUnique({
        name: this.UNIQUE_EMAIL_KEY,
        columnNames: ['email'],
      }),
    ]);

    await queryRunner.dropIndices('users', [
      new TableIndex({
        name: this.INDEX_USERNAME_KEY,
        columnNames: ['username'],
      }),
    ]);
  }
}

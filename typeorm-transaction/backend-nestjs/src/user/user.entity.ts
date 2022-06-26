import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;
}

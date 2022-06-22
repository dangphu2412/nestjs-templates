import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id',
  })
  id: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;
}

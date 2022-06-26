import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../../authorization/entities/role.entity';

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

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}

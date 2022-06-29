import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../authorization/entities/role.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}

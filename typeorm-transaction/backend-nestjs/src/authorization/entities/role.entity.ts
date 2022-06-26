import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'key',
    nullable: false,
  })
  key: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}

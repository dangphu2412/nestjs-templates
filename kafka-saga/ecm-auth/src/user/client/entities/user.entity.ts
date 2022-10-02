import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'full_name',
    nullable: false,
  })
  fullName: string;

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
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'films',
})
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    name: 'time_range',
    type: 'varchar',
    nullable: false,
  })
  timeRange: string;

  @Column({
    name: 'thumbnail',
    type: 'varchar',
    nullable: false,
  })
  thumbnail: string;

  @Column({
    name: 'premiere_date',
    type: 'timestamptz',
    nullable: false,
  })
  premiereDate: Date;

  @Column({
    name: 'show_types',
    nullable: false,
    type: 'simple-array',
  })
  showTypes: string[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

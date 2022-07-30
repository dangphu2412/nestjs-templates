import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree,
} from 'typeorm';

@Entity({
  name: 'menus',
})
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'code',
    nullable: false,
  })
  code: string;

  @Column({
    name: 'icon_code',
    nullable: true,
  })
  iconCode?: string;

  @Column({
    name: 'access_link',
    nullable: true,
  })
  accessLink?: string;

  @TreeChildren()
  subMenus: Menu[];

  @TreeParent()
  parent: Menu;
}

import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { omit, keyBy } from 'lodash';

type InsertMenu = Omit<Menu, 'id' | 'parent' | 'subMenus'> & {
  subMenus?: InsertMenu[];
};

export class InitMenus1659108460003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const menuRepository = queryRunner.manager.getTreeRepository(Menu);
    const menus: InsertMenu[] = [
      {
        name: 'User Management',
        iconCode: 'USER_MANAGEMENT_ICON',
        code: 'USER_MANAGEMENT',
        subMenus: [
          {
            name: 'Administrator',
            accessLink: '/users/admin',
            code: 'ADMIN',
          },
          {
            name: 'Accessibility',
            accessLink: '/users/access-control',
            code: 'ACCESS_CONTROL',
          },
        ],
      },
      {
        name: 'Category',
        iconCode: 'CATEGORY_ICON',
        code: 'CATEGORY',
      },
    ];

    const createdParent = await menuRepository.save(
      menus
        .map(InitMenus1659108460003.excludeSubMenus)
        .map((menu) => menuRepository.create(menu)),
    );

    const parentKeyById = keyBy(createdParent, 'name');

    await menuRepository.insert(
      menus
        .map((menu) => {
          return menu.subMenus.map((subMenu) => {
            const menuEntity = menuRepository.create(subMenu);
            menuEntity.parent = parentKeyById[menu.name];
            return menuEntity;
          });
        })
        .flat(),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const menuRepository = queryRunner.manager.getTreeRepository(Menu);
    await menuRepository.delete({
      code: In(['USER_MANAGEMENT', 'ADMIN', 'ACCESS_CONTROL', 'CATEGORY']),
    });
  }

  private static excludeSubMenus(
    menu: InsertMenu,
  ): Omit<InsertMenu, 'subMenus'> {
    return !menu.subMenus ? omit(menu) : { ...menu };
  }
}

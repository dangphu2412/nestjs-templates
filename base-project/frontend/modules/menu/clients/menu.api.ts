export type MenuItem = {
  id: string;
  name: string;
  accessLink?: string;
  iconCode?: string;
  subMenus?: MenuItem[];
};

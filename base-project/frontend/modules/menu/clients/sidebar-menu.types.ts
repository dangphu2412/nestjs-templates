import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type SidebarMenu = SidebarMenuItem[];

export type SidebarMenuItem = {
  id: string;
  name: string;
  accessLink?: string;
  icon: IconDefinition | undefined;
  subMenus: SidebarMenuItem[] | undefined;
};

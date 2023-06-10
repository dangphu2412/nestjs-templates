export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Role = {
  id: string;
  name: string;
  isEditable: boolean;
  description: string;
};

export type Right = Permission & { canAccess: boolean };
export type ControlList = {
  access: (Role & {
    rights: Right[];
  })[];
};

export type UpdateRoleDto = {
  id: string;
  rights: Array<string>;
};

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
};

export type CreateUserDto = {
  username: string;
  password: string;
};

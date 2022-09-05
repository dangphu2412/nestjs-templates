export interface TokenDto {
  type: string;
  name: string;
  value: string;
}

export interface LoginCredentials {
  tokens: TokenDto[];
}

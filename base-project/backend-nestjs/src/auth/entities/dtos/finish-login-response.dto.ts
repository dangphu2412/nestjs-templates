export interface TokenDto {
  type: string;
  name: string;
  value: string;
}

export interface FinishLoginResponseDto {
  tokens: TokenDto[];
}

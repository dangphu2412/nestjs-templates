export interface ITokenManager {
  renew(): Promise<void>;
  refresh(): void;
}

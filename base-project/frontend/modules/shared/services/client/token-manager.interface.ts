export interface ITokenManager {
  renew(): Promise<void>;
  clean(): void;
}

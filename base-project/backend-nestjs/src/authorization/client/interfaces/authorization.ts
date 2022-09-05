import { CanActivate } from '@nestjs/common';

export interface AuthorizationStrategy<T = any, R = any> {
  canAccess(providedData: T, toCompareData: R): boolean | Promise<boolean>;
}

export interface AuthorizationGuard extends CanActivate {
  validate(canAccess: boolean): void;
}

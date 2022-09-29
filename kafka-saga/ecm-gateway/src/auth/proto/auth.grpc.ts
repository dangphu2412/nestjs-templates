/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface LoginGoogleDto {
  idToken: string;
}

export interface Token {
  name: string;
  value: string;
}

export interface AuthCredentials {
  tokens: Token[];
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  loginByGoogle(
    request: LoginGoogleDto,
    metadata?: Metadata,
  ): Observable<AuthCredentials>;
}

export interface AuthServiceController {
  loginByGoogle(
    request: LoginGoogleDto,
    metadata?: Metadata,
  ): Promise<AuthCredentials> | Observable<AuthCredentials> | AuthCredentials;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['loginByGoogle'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface Empty {}

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

export interface MyProfile {
  id: string;
  email: string;
  fullName: string;
}

export interface MyClaims {
  sub: string;
  roles: string[];
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  loginByGoogle(
    request: LoginGoogleDto,
    metadata?: Metadata,
  ): Observable<AuthCredentials>;

  getMyProfile(request: Empty, metadata?: Metadata): Observable<MyProfile>;

  verifyToken(request: Token, metadata?: Metadata): Observable<MyClaims>;
}

export interface AuthServiceController {
  loginByGoogle(
    request: LoginGoogleDto,
    metadata?: Metadata,
  ): Promise<AuthCredentials> | Observable<AuthCredentials> | AuthCredentials;

  getMyProfile(
    request: Empty,
    metadata?: Metadata,
  ): Promise<MyProfile> | Observable<MyProfile> | MyProfile;

  verifyToken(
    request: Token,
    metadata?: Metadata,
  ): Promise<MyClaims> | Observable<MyClaims> | MyClaims;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'loginByGoogle',
      'getMyProfile',
      'verifyToken',
    ];
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

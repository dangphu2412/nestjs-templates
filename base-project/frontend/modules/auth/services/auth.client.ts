import {ApiClient} from "../../shared/api/api-client";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Tokens {
    tokens: {type: string, value: string}[];
}

export const AuthClient = {
    login(body: LoginRequest) {
        return ApiClient.post<Tokens, LoginRequest>('/v1/auth/login', body);
    }
}
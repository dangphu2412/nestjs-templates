import { ApiClient } from '../../shared/api/api-client'

export interface LoginRequest {
  username: string
  password: string
}

export interface Tokens {
  tokens: { name: string; type: string; value: string }[]
}

export const AuthApiClient = {
  login(body: LoginRequest) {
    return ApiClient.post<Tokens, LoginRequest>('/auth/login', body)
  }
}

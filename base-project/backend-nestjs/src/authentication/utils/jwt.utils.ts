import { JwtPayload } from '../entities/jwt-payload';

export function extractJwtPayload(token: string): JwtPayload | null {
  const jwtPayloadSerialized = token.split('.')[1];
  if (!jwtPayloadSerialized) {
    return null;
  }
  return JSON.parse(Buffer.from(jwtPayloadSerialized, 'base64').toString());
}

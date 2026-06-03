import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface Payload {
  sub: string;
}

export function signToken(payload: Payload): string {
  // Cast necessário: @types/jsonwebtoken@9 exige StringValue (tipo do ms), não string genérica
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): Payload {
  return jwt.verify(token, env.JWT_SECRET) as Payload;
}

import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface Payload {
  sub: string;
}

export function signToken(payload: Payload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyToken(token: string): Payload {
  return jwt.verify(token, env.JWT_SECRET) as Payload;
}

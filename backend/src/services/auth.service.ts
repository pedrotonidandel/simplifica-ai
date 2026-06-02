import crypto from 'crypto';
import { UserRepository } from '../repositories/user.repository';
import { hash, compare } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { AppError } from '../utils/errors';

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(email: string, name: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new AppError('E-mail já cadastrado.', 409);

    const passwordHash = await hash(password);
    const user = await this.userRepo.create({ email, name, passwordHash });
    const token = signToken({ sub: user.id });

    return { token, user: this.sanitize(user) };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError('Credenciais inválidas.', 401);

    const valid = await compare(password, user.passwordHash);
    if (!valid) throw new AppError('Credenciais inválidas.', 401);

    const token = signToken({ sub: user.id });
    return { token, user: this.sanitize(user) };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return; // Não revelar se o e-mail existe

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hora
    await this.userRepo.updateResetToken(user.id, token, expiry);

    // TODO: integrar serviço de e-mail (Resend / SendGrid)
    console.log(`[DEV] Reset token para ${email}: ${token}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepo.findByResetToken(token);
    if (!user) throw new AppError('Token inválido ou expirado.', 400);

    const passwordHash = await hash(newPassword);
    await this.userRepo.updatePassword(user.id, passwordHash);
  }

  private sanitize(user: { id: string; email: string; name: string }) {
    return { id: user.id, email: user.email, name: user.name };
  }
}

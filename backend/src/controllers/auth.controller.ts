import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';

const registerSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  name: z.string().min(2, 'Nome muito curto.').max(100),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const forgotSchema = z.object({
  email: z.string().email(),
});

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = registerSchema.parse(req.body);
      const result = await this.authService.register(body.email, body.name, body.password);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = loginSchema.parse(req.body);
      const result = await this.authService.login(body.email, body.password);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = forgotSchema.parse(req.body);
      await this.authService.forgotPassword(email);
      res.json({ message: 'Se o e-mail existir, você receberá um link de recuperação.' });
    } catch (e) {
      next(e);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, password } = resetSchema.parse(req.body);
      await this.authService.resetPassword(token, password);
      res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (e) {
      next(e);
    }
  };
}

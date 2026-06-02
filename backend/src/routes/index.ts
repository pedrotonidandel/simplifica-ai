import { Router } from 'express';
import { prisma } from '../config/database';

import { UserRepository } from '../repositories/user.repository';
import { AnalysisRepository } from '../repositories/analysis.repository';
import { UsageRepository } from '../repositories/usage.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';

import { AuthService } from '../services/auth.service';
import { OpenAIService } from '../services/openai.service';
import { UsageService } from '../services/usage.service';
import { AnalysisService } from '../services/analysis.service';
import { SubscriptionService } from '../services/subscription.service';

import { AuthController } from '../controllers/auth.controller';
import { AnalysisController } from '../controllers/analysis.controller';
import { SubscriptionController } from '../controllers/subscription.controller';

import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePremium } from '../middlewares/plan.middleware';

const router = Router();

// Repositories
const userRepo = new UserRepository(prisma);
const analysisRepo = new AnalysisRepository(prisma);
const usageRepo = new UsageRepository(prisma);
const subRepo = new SubscriptionRepository(prisma);

// Services
const authService = new AuthService(userRepo);
const openaiService = new OpenAIService();
const usageService = new UsageService(usageRepo, subRepo);
const analysisService = new AnalysisService(openaiService, usageService, analysisRepo);
const subService = new SubscriptionService(subRepo);

// Controllers
const authController = new AuthController(authService);
const analysisController = new AnalysisController(analysisService);
const subController = new SubscriptionController(subService);

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);

// Analyses (protegido)
router.post('/analyses', authMiddleware, analysisController.analyze);
router.get('/analyses', authMiddleware, analysisController.getHistory);
router.get('/analyses/:id', authMiddleware, analysisController.getById);
router.delete('/analyses/:id', authMiddleware, analysisController.delete);

// Subscriptions
router.get('/subscription', authMiddleware, subController.getMySubscription);
router.post('/subscription/webhook', subController.webhook);

// Health
router.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default router;

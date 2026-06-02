import { api } from './api';

export interface Subscription {
  id: string;
  userId: string;
  plan: 'FREE' | 'PREMIUM';
  status: string;
  expiresAt: string | null;
}

export const subscriptionService = {
  getMySubscription: async (): Promise<Subscription> => {
    const { data } = await api.get<Subscription>('/subscription');
    return data;
  },
};

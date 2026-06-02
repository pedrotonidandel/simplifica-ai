import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth.types';

interface AuthState {
  token: string | null;
  user: User | null;
  plan: 'FREE' | 'PREMIUM';
  dailyRemaining: number;
  setAuth: (token: string, user: User) => void;
  setPlan: (plan: 'FREE' | 'PREMIUM') => void;
  setDailyRemaining: (n: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      plan: 'FREE',
      dailyRemaining: 5,

      setAuth: (token, user) => set({ token, user }),
      setPlan: (plan) => set({ plan }),
      setDailyRemaining: (dailyRemaining) => set({ dailyRemaining }),
      logout: () =>
        set({ token: null, user: null, plan: 'FREE', dailyRemaining: 5 }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

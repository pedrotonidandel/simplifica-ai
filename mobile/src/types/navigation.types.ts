import { Analysis } from './analysis.types';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  History: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Result: { analysis: Analysis };
  Premium: undefined;
};

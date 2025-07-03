import { createContext } from 'react';
import { type User as FirebaseUser } from "firebase/auth";
import type { AppUserData } from '../types/UserTypes';

type AppState = {
  user: FirebaseUser | null;
  userData: AppUserData | null;
  loading?: boolean;
  setAppState: (state: Partial<AppState>) => void;
};

export const AppContext = createContext<AppState>({
  user: null,
  userData: null,
  loading: true,
  setAppState: () => {},
});
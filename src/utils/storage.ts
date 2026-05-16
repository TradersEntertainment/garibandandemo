import { GaribanScore } from './scoring';

const STORAGE_KEY = 'garibandan_user';

export interface UserData {
  name: string;
  vibe: string | null;
  score: GaribanScore | null;
  isVip: boolean;
  completedOnboarding: boolean;
  completedTest: boolean;
}

const defaultUser: UserData = {
  name: '',
  vibe: null,
  score: null,
  isVip: false,
  completedOnboarding: false,
  completedTest: false,
};

export function getUser(): UserData {
  if (typeof window === 'undefined') return defaultUser;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? { ...defaultUser, ...JSON.parse(data) } : defaultUser;
  } catch {
    return defaultUser;
  }
}

export function saveUser(data: Partial<UserData>): void {
  if (typeof window === 'undefined') return;
  const current = getUser();
  const updated = { ...current, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

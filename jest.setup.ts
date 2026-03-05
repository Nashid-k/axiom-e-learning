import type { ReactNode } from 'react';
import '@testing-library/jest-dom'

jest.mock('next-auth/react', () => ({
  __esModule: true,
  SessionProvider: ({ children }: { children: ReactNode }) => children,
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

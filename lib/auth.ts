import { signIn, signOut, useSession } from 'next-auth/client';

export const authenticate = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const useUserSession = () => {
  const [session, loading] = useSession();
  return { session, loading };
};
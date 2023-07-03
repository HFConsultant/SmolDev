```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/client';

export interface UserSchema {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const signIn = (callbackUrl?: string) => {
  nextAuthSignIn('google', { callbackUrl });
};

export const signOut = (callbackUrl?: string) => {
  nextAuthSignOut({ callbackUrl });
};

export const useUser = (): [UserSchema | null, boolean] => {
  const [session, loading] = useSession();
  return [session?.user || null, loading];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await signIn();
        res.status(200).json({ success: true, message: 'SIGN_IN_SUCCESS' });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        await signOut();
        res.status(200).json({ success: true, message: 'SIGN_OUT_SUCCESS' });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```
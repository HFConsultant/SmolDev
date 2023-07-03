import { NextApiRequest, NextApiResponse } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const user = await signIn('google', { callbackUrl: `${req.protocol}://${req.headers.host}/posts` });
        if (user) {
          res.status(200).json({ success: true, message: 'SIGN_IN_SUCCESS', data: user });
        } else {
          res.status(400).json({ success: false, message: 'SIGN_IN_FAILED' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'SERVER_ERROR', error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const signOutResponse = await signOut({ callbackUrl: `${req.protocol}://${req.headers.host}` });
        if (signOutResponse) {
          res.status(200).json({ success: true, message: 'SIGN_OUT_SUCCESS' });
        } else {
          res.status(400).json({ success: false, message: 'SIGN_OUT_FAILED' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'SERVER_ERROR', error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
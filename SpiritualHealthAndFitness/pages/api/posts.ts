import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../utils/db';
import { PostSchema } from '../../utils/posts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (!title || title.trim() === '' || !content || content.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newPost = {
      title,
      content,
      creator: session.user.email,
    };

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed.' });
      return;
    }

    try {
      await client.collection('posts').insertOne(newPost);
      res.status(201).json({ message: 'Post created.' });
    } catch (error) {
      res.status(500).json({ message: 'Inserting post failed.' });
    }
    client.close();
  }
};
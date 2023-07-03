import { NextApiRequest, NextApiResponse } from 'next';
import { CommentSchema } from '../schemas/Comment';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Comment = mongoose.model('Comment', CommentSchema);

export const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text, postId, userId } = req.body;

  if (!text || !postId || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newComment = new Comment({
    text,
    postId,
    userId,
  });

  try {
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating comment' });
  }
};

export const getCommentsByPostId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ message: 'Missing postId' });
  }

  try {
    const comments = await Comment.find({ postId });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comments' });
  }
};
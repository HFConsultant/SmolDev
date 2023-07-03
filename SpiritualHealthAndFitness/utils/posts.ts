import { NextApiRequest, NextApiResponse } from 'next';
import { PostSchema } from '../schemas/Post';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = mongoose.model('Post', PostSchema);

export const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: 'POST_CREATED', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create post' });
  }
};

export const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, content } = req.body;

  if (!id || (!title && !content)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json({ message: 'Post updated', post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update post' });
  }
};

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete post' });
  }
};
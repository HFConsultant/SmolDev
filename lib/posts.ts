import { Post } from '../types/index.d.ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts(): Promise<Post[]> {
  return await prisma.post.findMany();
}

export async function getPostById(id: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id },
  });
}

export async function createPost(post: Post): Promise<Post> {
  return await prisma.post.create({
    data: post,
  });
}

export async function updatePost(id: string, post: Post): Promise<Post> {
  return await prisma.post.update({
    where: { id },
    data: post,
  });
}

export async function deletePost(id: string): Promise<Post> {
  return await prisma.post.delete({
    where: { id },
  });
}
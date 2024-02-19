import { PrismaClient } from '@prisma/client';
import { Like } from '../types/index.d.ts';

const prisma = new PrismaClient();

export async function likePost(userId: string, postId: string): Promise<Like> {
  return await prisma.like.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });
}

export async function unlikePost(userId: string, postId: string): Promise<void> {
  await prisma.like.deleteMany({
    where: {
      userId: userId,
      postId: postId,
    },
  });
}
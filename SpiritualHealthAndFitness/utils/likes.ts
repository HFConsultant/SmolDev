import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface LikeSchema {
  id: number;
  userId: number;
  postId: number;
}

export async function likePost(userId: number, postId: number): Promise<LikeSchema> {
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  return like;
}

export async function getLikes(postId: number): Promise<LikeSchema[]> {
  const likes = await prisma.like.findMany({
    where: {
      postId,
    },
  });

  return likes;
}

export async function unlikePost(userId: number, postId: number): Promise<void> {
  await prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
}
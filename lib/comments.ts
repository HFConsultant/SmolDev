import { Comment } from '../types/index.d.ts';

let comments: Comment[] = [];

export function createComment(comment: Comment) {
  comments.push(comment);
  return comment;
}

export function editComment(id: string, updatedComment: Partial<Comment>) {
  const commentIndex = comments.findIndex(comment => comment.id === id);
  if (commentIndex > -1) {
    comments[commentIndex] = { ...comments[commentIndex], ...updatedComment };
    return comments[commentIndex];
  }
  return null;
}

export function deleteComment(id: string) {
  const commentIndex = comments.findIndex(comment => comment.id === id);
  if (commentIndex > -1) {
    const deletedComment = comments[commentIndex];
    comments = comments.filter(comment => comment.id !== id);
    return deletedComment;
  }
  return null;
}
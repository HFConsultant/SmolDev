import React from 'react';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';
import Comment from './Comment';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    likes: number;
    comments: Array<{ id: string; content: string; }>;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <LikeButton likes={post.likes} postId={post.id} />
      <CommentForm postId={post.id} />
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Post;
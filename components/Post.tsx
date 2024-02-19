import { FC } from 'react';
import { Post as PostType } from '../types/index.d.ts';
import Comment from './Comment';
import LikeButton from './LikeButton';

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-actions">
        <LikeButton postId={post.id} />
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
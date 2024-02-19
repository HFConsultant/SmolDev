import { Comment } from '../types/index.d.ts';
import 'styles/Comment.module.css';

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-user">{comment.user}</div>
      <div className="comment-content">{comment.content}</div>
    </div>
  );
};

export default CommentComponent;
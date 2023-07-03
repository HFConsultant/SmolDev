import React from 'react';

interface CommentProps {
  comment: {
    id: string;
    text: string;
    user: {
      name: string;
    };
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-user">{comment.user.name}</div>
      <div className="comment-text">{comment.text}</div>
    </div>
  );
};

export default Comment;
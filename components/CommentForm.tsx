import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { createComment } from '../lib/comments';

const CommentForm = ({ postId }) => {
  const [session] = useSession();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      return;
    }

    await createComment(postId, content, session.user.email);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} id="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../utils/comments';

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createComment({ variables: { postId, content } });
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="comment-form" className="flex flex-col space-y-4">
      <textarea
        className="border border-gray-300 p-2 rounded-md"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/posts';

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ variables: { title, content } });
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="post-form" onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {loading ? 'Loading...' : 'Post'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
};

export default PostForm;
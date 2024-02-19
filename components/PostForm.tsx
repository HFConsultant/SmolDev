import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { createPost } from '../lib/posts';
import styles from '../styles/PostForm.module.css';

const PostForm = () => {
  const [session] = useSession();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Please sign in to post');
      return;
    }
    if (!content) {
      alert('Content cannot be empty');
      return;
    }
    const post = { content, userId: session.user.id };
    const created = await createPost(post);
    if (created) {
      setContent('');
    }
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button className={styles.submitButton} type="submit">
        Post
      </button>
    </form>
  );
};

export default PostForm;
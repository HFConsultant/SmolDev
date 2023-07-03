import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from '../utils/auth';
import QuoteOfTheDay from '../components/QuoteOfTheDay';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import SignInButton from '../components/SignInButton';

const Posts = () => {
  const [session, loading] = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data.posts));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <QuoteOfTheDay />
        <SignInButton />
      </div>
    );
  }

  return (
    <div>
      <QuoteOfTheDay />
      <PostForm />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
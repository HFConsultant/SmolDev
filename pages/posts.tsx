```tsx
import { useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Post as PostType } from '../types/index.d.ts';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import QuoteOfTheDay from '../components/QuoteOfTheDay';
import { getPosts } from '../lib/posts';

export default function Posts({ posts }: { posts: PostType[] }) {
  const [session, loading] = useSession();

  return (
    <div>
      <QuoteOfTheDay />
      {session && <PostForm />}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};
```
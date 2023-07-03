import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../utils/auth';
import SignInButton from '../components/SignInButton';
import QuoteOfTheDay from '../components/QuoteOfTheDay';

const HomePage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/posts');
    }
  }, [user, loading]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Spiritual Health and Fitness</h1>
      <QuoteOfTheDay />
      {!user && <SignInButton />}
    </div>
  );
};

export default HomePage;
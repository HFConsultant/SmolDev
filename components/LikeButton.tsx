import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { Like } from '../types/index.d.ts';
import { likePost, unlikePost } from '../lib/likes.ts';

export default function LikeButton({ post }) {
  const [session, loading] = useSession();
  const [likes, setLikes] = useState<Like[]>(post.likes);

  const handleLike = async () => {
    if (!session) {
      return;
    }

    const newLike = await likePost(post.id, session.user.email);
    setLikes([...likes, newLike]);
  };

  const handleUnlike = async () => {
    if (!session) {
      return;
    }

    const remainingLikes = await unlikePost(post.id, session.user.email);
    setLikes(remainingLikes);
  };

  const userHasLiked = likes.some(like => like.userEmail === session?.user?.email);

  return (
    <div>
      {userHasLiked ? (
        <button onClick={handleUnlike} className="btn btn-primary">
          Unlike
        </button>
      ) : (
        <button onClick={handleLike} className="btn btn-outline-primary">
          Like
        </button>
      )}
      <span>{likes.length}</span>
    </div>
  );
}
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '../utils/likes';

interface LikeButtonProps {
  postId: string;
  likes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId },
    onCompleted: () => {
      setLikeCount(likeCount + 1);
    },
  });

  const handleLike = () => {
    likePost();
  };

  return (
    <button
      id="like-button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLike}
    >
      Like {likeCount}
    </button>
  );
};

export default LikeButton;
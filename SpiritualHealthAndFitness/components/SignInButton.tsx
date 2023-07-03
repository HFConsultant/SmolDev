import React from 'react';
import { signIn } from '../utils/auth';

const SignInButton: React.FC = () => {
  return (
    <button
      id="signin-button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
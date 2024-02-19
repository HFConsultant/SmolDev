import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/SignInButton.module.css'

export default function SignInButton() {
  const [session, loading] = useSession()

  return (
    <div className={styles.container}>
      {!session && (
        <button className={styles.button} onClick={() => signIn('google')}>
          Sign in
        </button>
      )}
      {session && (
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      )}
    </div>
  )
}
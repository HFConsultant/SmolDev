```tsx
import { signIn, useSession } from 'next-auth/client'
import SignInButton from '../components/SignInButton'
import QuoteOfTheDay from '../components/QuoteOfTheDay'
import Post from '../components/Post'
import { getServerSideProps as getPostsServerSideProps } from './posts'
import styles from '../styles/Home.module.css'

export default function Home({ posts, quote }) {
  const [session, loading] = useSession()

  return (
    <div className={styles.container}>
      <QuoteOfTheDay quote={quote} />
      {!session && <SignInButton />}
      {session && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
}

export async function getServerSideProps(context) {
  const postsProps = await getPostsServerSideProps(context)
  const quote = await fetch('https://api.quotable.io/random').then((res) => res.json())

  return {
    props: {
      posts: postsProps.props.posts,
      quote: quote.content,
    },
  }
}
```
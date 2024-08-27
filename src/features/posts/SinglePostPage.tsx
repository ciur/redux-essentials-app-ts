import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'

import { useAppSelector } from '@/app/hooks'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector(state =>
    selectPostById(state, postId!)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <div>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </div>
      </article>
    </section>
  )
}

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from '@/components/Spinner'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectAllPosts} from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'

import {
  fetchPosts,
  selectPostById,
  selectPostIds,
  selectPostsStatus,
  selectPostsError
} from './postsSlice'

interface PostExcerptProps {
  postId: string
}


let PostExcerpt = ({ postId }: PostExcerptProps) => {
  const post = useAppSelector(state => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}


export const PostsList = () => {
  const dispatch = useAppDispatch()
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)
  const orderedPostIds = useAppSelector(selectPostIds)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'rejected') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

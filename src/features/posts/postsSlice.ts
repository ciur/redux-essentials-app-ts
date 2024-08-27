import type { RootState } from '@/app/store'
import { nanoid } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string,
  date: string
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString()
  }
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString() }
        }
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

// Export the generated reducer function
export default postsSlice.reducer

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions


export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find(post => post.id === postId)

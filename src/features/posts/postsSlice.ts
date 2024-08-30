import { createAppAsyncThunk } from '@/app/withTypes'
import { AppStartListening } from '@/app/listenerMiddleware'
import { apiSlice } from '@/features/api/apiSlice'
import { client } from '@/api/client'


export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export type NewPost = Pick<Post, 'title' | 'content' | 'user'>


// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string,
  date: string,
  reactions: Reactions
}

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: NewPost) => {
    // We send the initial data to the fake API server
    const response = await client.post<Post>('/fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)


export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: apiSlice.endpoints.addNewPost.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    }
  })
}

export const updatePostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: apiSlice.endpoints.editPost.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('Post updated!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    }
  })
}

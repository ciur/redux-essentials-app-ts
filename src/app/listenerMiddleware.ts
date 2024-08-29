import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import { addPostsListeners, updatePostsListeners } from '@/features/posts/postsSlice'
import type { RootState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()
export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
export type AppAddListener = typeof addAppListener


// Call this and pass in `startAppListening` to let the
// posts slice set up its listeners
addPostsListeners(startAppListening)
updatePostsListeners(startAppListening)

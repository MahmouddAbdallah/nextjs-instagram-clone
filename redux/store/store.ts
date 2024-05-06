import { configureStore } from '@reduxjs/toolkit';
import user from '../features/user';
import postReducer from '../features/post';
import postsReducer from '../features/posts';
import likes from '../features/postLike';

export const store = configureStore({
    reducer: {
        user: user,
        post: postReducer,
        like: likes,
        posts: postsReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
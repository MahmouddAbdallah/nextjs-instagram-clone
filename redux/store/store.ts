import { configureStore } from '@reduxjs/toolkit';
import user from '../features/user';
import postReducer from '../features/post';
import likes from '../features/postLike';

export const store = configureStore({
    reducer: {
        user: user,
        post: postReducer,
        like: likes
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
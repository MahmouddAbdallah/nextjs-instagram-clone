import { commentType, postType } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
    posts: any
}

const initialState: PostsState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostsData(state, action: PayloadAction<any>) {
            return { state, ...action.payload }
        },
        addPost(state, action: PayloadAction<any>) {
            state.posts.unshift(action.payload)
        }
    }
})

export const { setPostsData, addPost } = postSlice.actions
export default postSlice.reducer
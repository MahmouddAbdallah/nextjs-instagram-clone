import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeInterFace {
    count: number,
    isLike: boolean,
    users: [
        {
            user: {
                id: string,
                picture: string
                username: string
            }
        }
    ]
}

const initialState: LikeInterFace = {
    count: 0,
    isLike: true,
    users: [
        {
            user: {
                id: "",
                picture: "",
                username: ""
            }
        }
    ]
}

const postLikeSlice = createSlice({
    name: "like",
    initialState: initialState,
    reducers: {
        setLikes(state, action: PayloadAction<Partial<LikeInterFace>>) {
            return { ...state, ...action.payload }
        },
        addLike: (state) => { }
    }
})

export const { setLikes, addLike } = postLikeSlice.actions;
export default postLikeSlice.reducer;
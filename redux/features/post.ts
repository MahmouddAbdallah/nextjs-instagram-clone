import { commentType } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
    likes: string[];
    comments: commentType[];
    id: string;
    title: string;
    userId: string;
    image: string;
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
        picture: string | null;
    };
}

const initialState: PostState = {
    id: "",
    likes: [],
    comments: [],
    title: "",
    userId: "",
    image: "",
    user: {
        id: "",
        name: "",
        username: "",
        email: "",
        picture: ""
    }
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        //Image
        setPostData(state, action: PayloadAction<Partial<PostState>>) {
            return { ...state, ...action.payload };
        },
        setLikePost(state, action: PayloadAction<object>) {
        },
        setComment(state, action: PayloadAction<commentType[]>) {
            state.comments = action.payload;
        },
        addComment(state, action: PayloadAction<commentType>) {
            state.comments.push(action.payload);
        },
        addCommentLike(state, action: PayloadAction<{ userId: string; commentId: string }>) {
            const comment = state.comments.find(comment => comment.id === action.payload.commentId);
            if (comment) {
                const index = comment.CommentLike.findIndex(like => like.userId === action.payload.userId);
                if (index === -1) {
                    // Like not found, add it
                    comment.CommentLike.push({ userId: action.payload.userId });
                } else {
                    // Like found, remove it
                    comment.CommentLike.splice(index, 1);
                }
            }
        }
    }
})

export const { setPostData, setComment, addCommentLike, addComment } = postSlice.actions
export default postSlice.reducer
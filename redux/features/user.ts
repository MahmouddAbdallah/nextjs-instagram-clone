import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface userInterface {
    id: string,
    name: string,
    username: string,
    email: string,
    picture: string | null,
}
const initialState: userInterface = {
    id: '',
    name: '',
    username: '',
    email: "",
    picture: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<Partial<userInterface>>) {
            return { ...state, ...action.payload }
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer
import { SetStateAction } from "react"

export type userTypes = {
    id: string,
    name: string,
    username: string,
    email: string,
    picture: string | null,
}
export type AppContextTypes = {
    user: userTypes,
    setUser: React.Dispatch<SetStateAction<userTypes>>,
}

export type postType = {
    id: string,
    title: string,
    userId: string,
    image: string,
    user: {
        id: string,
        name: string,
        username: string,
        email: string,
        picture: string | null,
    }
}

export type commentType = {
    id: string,
    text: string,
    user: {
        id: string,
        picture: string,
        username: string
    },
    CommentLike: [{
        userId: string
    }]
}
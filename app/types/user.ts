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
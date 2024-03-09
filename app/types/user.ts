import { SetStateAction } from "react"

export type userTypes = {
    id: string,
    name: string,
    username: string,
    email: string,
    picture: string,
}
export type AppContextTypes = {
    user: userTypes,
    setUser: React.Dispatch<SetStateAction<userTypes>>,
}
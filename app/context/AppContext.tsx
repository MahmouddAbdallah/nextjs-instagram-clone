'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { AppContextTypes, userTypes } from '../types/user'
const appContext = createContext<AppContextTypes | undefined>(undefined);

interface appContextProps {
    children: React.ReactNode
}
const AppContextProvider: React.FC<appContextProps> = ({ children }) => {
    const [user, setUser] = useState<userTypes>({} as userTypes);
    const fetchUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            if (!res.ok) throw new Error(await res.text());
            const user = await res.json()
            setUser(user.user);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <appContext.Provider value={{ user, setUser }}>
            {children}
        </appContext.Provider>
    )
}
export const useAppContext = () => {
    return (
        useContext(appContext)
    )
}
export default AppContextProvider
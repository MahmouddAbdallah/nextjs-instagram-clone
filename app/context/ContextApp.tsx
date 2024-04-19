'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AppContextTypes, userTypes } from '../types/user'
import axios from 'axios';
import { setUserData } from '@/redux/features/user';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../hooks/reduxHooks';
const appContext = createContext<{} | undefined>(undefined);

const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const dispatch = useAppDispatch();
    const getUser = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/user`)
                dispatch(setUserData(data.user))
            } catch (error) {
                console.error(error);
            }
        }, [dispatch]
    )

    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <appContext.Provider value={{}}>
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
'use client'
import { createContext, useCallback, useEffect } from 'react'
import axios from 'axios';
import { setUserData } from '@/redux/features/user';
import { useAppDispatch } from '../hooks/reduxHooks';
import { Toaster } from 'react-hot-toast';

const appContext = createContext<{} | undefined>(undefined);

const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const dispatch = useAppDispatch();
    const getUser = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`/api/user/verfily-user`)
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
            <Toaster position='bottom-right' toastOptions={{ duration: 4000 }} />
        </appContext.Provider>
    )
}
export default AppContextProvider
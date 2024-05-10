'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { setUserData } from '@/redux/features/user';
import { useAppDispatch } from '../hooks/reduxHooks';
import { Toaster } from 'react-hot-toast';
import { socket } from '../components/socket';

const appContext = createContext<{} | undefined>(undefined);

const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);


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
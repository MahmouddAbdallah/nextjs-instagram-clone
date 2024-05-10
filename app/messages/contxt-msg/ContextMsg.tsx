'use client'
import { socket } from '@/app/components/socket';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { SetStateAction, createContext, useCallback, useContext, useEffect, useState } from 'react'
interface contextInterface {
    messages: [],
    setMessages: React.Dispatch<SetStateAction<[]>>,
    chats: []
}
const appContext = createContext<contextInterface | undefined>(undefined);

const AppContextMsgProvider = ({ children }: {
    children: React.ReactNode,
}) => {
    const [messages, setMessages] = useState<any>([]);
    const [chats, setChats] = useState<any>([]);
    const query = useSearchParams()
    const userId = query.get('userId');
    const chatId = query.get('chatId');

    const fetchChats = async () => {
        try {
            const { data } = await axios.get(`/api/messages/chat`);
            setChats(data.chats)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchChats()
    }, [])
    const fetchMessage = useCallback(
        async () => {
            try {
                if (chatId) {
                    const { data } = await axios.get(`/api/messages/message?chatId=${chatId}&userId=${userId}`);
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error(error);
            }
        }, [chatId, userId]
    )
    useEffect(() => {
        fetchMessage()
    }, [fetchMessage])

    useEffect(() => {
        socket.emit('join-chat', chatId)
    }, [chatId])
    return (
        <appContext.Provider value={{ messages, chats, setMessages }}>
            {children}
        </appContext.Provider>
    )
}

export const useContextMsgApp = () => {
    return useContext(appContext)
}

export default AppContextMsgProvider
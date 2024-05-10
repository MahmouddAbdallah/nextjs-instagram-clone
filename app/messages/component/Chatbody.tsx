'use client'
import React, { useEffect } from 'react'
import ScrollBottom from 'react-scroll-to-bottom'
import { useContextMsgApp } from '../contxt-msg/ContextMsg'
import clsx from 'clsx'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import Image from 'next/image'
import { socket } from '@/app/components/socket'
const Chatbody = ({ userId, chatId }: { chatId: string, userId: string }) => {
    const context = useContextMsgApp();
    const user = useAppSelector((state) => state.user)
    useEffect(() => {
        const handleReceivedMessage = (data: any) => {
            context?.setMessages((prevMessages: any) => [...prevMessages, data.message] as any);
        };
        socket.on('messageResponse', handleReceivedMessage);
        return () => {
            // Clean up the socket subscription when the component unmounts
            socket.off('messageResponse', handleReceivedMessage);
        };
    }, [chatId, context])

    return (
        <ScrollBottom scrollViewClassName='scroll-hide' className='h-[calc(100vh-41px)] overflow-y-auto hide-scrollbar  '>
            <div className='w-full space-y-2 px-3 pt-3'>
                {context?.messages?.map((message: any) => {
                    return (
                        <div key={message.id} >
                            <div className={clsx(
                                'w-full flex',
                                { 'justify-end ': message.sender.id == user.id }
                            )}>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        {
                                            message.sender.id != user.id &&
                                            <div className='w-6 h-6'>
                                                <div>
                                                    {message?.sender?.picture ?
                                                        <Image
                                                            src={message?.sender?.picture as string}
                                                            height={50}
                                                            width={50}
                                                            className='w-6 h-6 rounded-full'
                                                            alt=''
                                                        /> :
                                                        <div className='w-6 h-6 text-xs bg-red-400 rounded-full flex justify-center items-center text-white font-medium'>
                                                            {
                                                                message.sender.username?.split("")[0]
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className={clsx(
                                        'w-full ',
                                        { 'w-fit max-w-96 bg-blue-500  text-white px-3 py-2 rounded-lg': message.sender.id == user.id },
                                        { 'w-fit max-w-96 bg-gray-200  px-3 py-2 rounded-lg': message.sender.id != user.id }
                                    )}>
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollBottom>
    )
}

export default Chatbody
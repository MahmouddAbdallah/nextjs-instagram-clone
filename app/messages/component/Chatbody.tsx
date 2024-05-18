'use client'
import React, { SetStateAction, useCallback, useEffect } from 'react'
import ScrollBottom from 'react-scroll-to-bottom'
import { useContextMsgApp } from '../contxt-msg/ContextMsg'
import clsx from 'clsx'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import Image from 'next/image'
import { socket } from '@/app/components/socket';
import { FaArrowLeftLong } from "react-icons/fa6";

const Chatbody = ({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const context = useContextMsgApp();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        const handleReceivedMessage = (data: any) => {
            context?.setMessages((prevMessages: any) => [...prevMessages, data.message] as any);
        }
        socket.on('messageResponse', handleReceivedMessage);
        return () => {
            socket.off('messageResponse');
        };
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-50 w-full bg-white py-3 px-5 shadow-md'>
                {context?.user &&
                    <div>
                        <div className='flex items-center gap-3'>
                            <button
                                className='md:hidden'
                                onClick={() => {
                                    setOpen(true)
                                }}>
                                <FaArrowLeftLong size={15} />
                            </button>
                            {context.user.picture ?
                                <div className=''>
                                    <Image
                                        src={context?.user?.picture}
                                        height={50}
                                        width={50}
                                        className='w-8 h-8 md:w-11 md:h-11 rounded-full'
                                        alt=''
                                    />
                                </div>
                                :
                                <div className='w-8 h-8 md:w-11 md:h-11 text-xs bg-red-400 rounded-full flex justify-center items-center text-white font-medium'>
                                    {
                                        context.user.username?.split("")[0]
                                    }
                                </div>
                            }
                            <span className='font-medium'>{context?.user?.username}</span>
                        </div>
                    </div>
                }
            </div>
            <ScrollBottom scrollViewClassName='scroll-hide' className={clsx(
                'overflow-y-auto hide-scrollbar',
                { 'h-[calc(100svh-(140px))] md:h-[calc(100svh-(153px))]': context?.user },
                { 'h-[calc(100svh-(110px))]': !context?.user }
            )}>
                <div>
                    <div className='w-full space-y-2 px-3 py-3'>
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
                </div>
            </ScrollBottom>
        </div>
    )
}

export default Chatbody
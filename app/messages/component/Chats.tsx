'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { SetStateAction } from 'react'
import { useContextMsgApp } from '../contxt-msg/ContextMsg';
import { useAppSelector } from '@/app/hooks/reduxHooks';
import { FaArrowLeftLong } from 'react-icons/fa6';

const Chats = ({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const context = useContextMsgApp();
    const user = useAppSelector(state => state.user)

    return (
        <div className='border-r-2 w-full h-full'>
            <div className='sticky z-50 top-0 bg-white py-4 md:py-5 px-5 border-b'>
                <div className='flex'>
                    <Link href={'/'}
                        className='md:hidden flex items-center'>
                        <FaArrowLeftLong className='w-4 h-4' />
                    </Link>
                    <div className="flex-1 flex justify-center font-semibold text-sm md:text-xl">
                        {user?.username}
                    </div>
                </div>
            </div>
            <div>
                {context?.chats?.map((chat: any) => {
                    return (
                        <Link
                            onClick={() => { setOpen(false) }}
                            href={`/messages?userId=${chat.user.id}&chatId=${chat.id}`} key={chat.id}>
                            <div className='flex items-center gap-3 w-full px-3 py-2'>
                                <div>
                                    {chat.user.picture ?
                                        <Image
                                            src={chat?.user?.picture as string}
                                            height={50}
                                            width={50}
                                            className='w-14 h-14 rounded-full'
                                            alt=''
                                        /> :
                                        <div className='w-14 h-14'>
                                            <div className='w-14 h-14 bg-red-400 rounded-full flex justify-center items-center text-white font-medium'>
                                                {
                                                    chat.user.username?.split("")[0]
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='leading-tight'>
                                    <h4 className='font-medium'>{chat.user.username}</h4>
                                    <span className='text-xs text-black/50 md:hidden'>{chat.latestMessage}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Chats
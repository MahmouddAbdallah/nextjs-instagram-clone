'use client'
import React, { useState } from 'react'
import Chatbody from '../component/Chatbody';
import TypingMsg from '../component/TypingMsg';
import Chats from '../component/Chats';
import { useContextMsgApp } from '../contxt-msg/ContextMsg';
import { MessagesIcon } from '@/app/components/icons';

const Messages = ({ userId, chatId }: { userId: string, chatId: string }) => {

    const [open, setOpen] = useState(true)
    const context = useContextMsgApp();
    return (
        <div className='w-full flex flex-col justify-between'>
            <div >
                <div className='grid grid-cols-12 md:hidden'>
                    {
                        open ?
                            <div className="col-span-12 md:col-span-3">
                                <Chats
                                    setOpen={setOpen}
                                />
                            </div>
                            :
                            <div className="col-span-12 md:col-span-9">
                                {context?.userId ?
                                    <>
                                        <Chatbody
                                            setOpen={setOpen} />
                                        <TypingMsg
                                            userId={userId}
                                            chatId={chatId}
                                        />
                                    </>
                                    :
                                    <div className='flex justify-center h-svh items-center'>
                                        <div>
                                            <MessagesIcon className='w-32 h-32' />
                                        </div>
                                    </div>
                                }
                            </div>
                    }
                </div>
                <div className='hidden md:grid grid-cols-12'>
                    <div className="col-span-12 md:col-span-3">
                        <Chats
                            setOpen={setOpen}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        {context?.userId ?
                            <>
                                <Chatbody
                                    setOpen={setOpen} />
                                <TypingMsg
                                    userId={userId}
                                    chatId={chatId}
                                />
                            </>
                            :
                            <div className='flex justify-center h-svh items-center'>
                                <div>
                                    <MessagesIcon className='w-32 h-32' />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages
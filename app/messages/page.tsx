import React from 'react'
import Chatbody from './component/Chatbody';
import TypingMsg from './component/TypingMsg';

const page = async ({ searchParams }: { searchParams: { chatId: string, userId: string } }) => {
    const { chatId, userId } = searchParams

    return (
        <div className=''>
            <div className='w-full flex flex-col justify-between'>
                <Chatbody
                    chatId={chatId}
                    userId={userId}
                />
                <TypingMsg
                    chatId={chatId}
                    userId={userId}
                />
            </div>
        </div>
    )
}

export default page
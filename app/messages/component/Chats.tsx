import Image from 'next/image';
import React from 'react'

const Chats = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/messages/chat`, {
        method: 'GET',
    });
    if (!res.ok) {
        throw new Error(await res.text());
    }
    const data = await res.json();
    console.log(data);

    return (
        <div>
            {data.chats.map((chat: any) => {
                return (
                    <div key={chat.id}>
                        <div className='flex items-center gap-1'>
                            <div>
                                <Image
                                    src={chat.user.pictrue as string}
                                    height={50}
                                    width={50}
                                    className='w-8 h-8 rounded-full'
                                    alt=''
                                />
                            </div>
                            <h4 className='font-medium'>{chat.user.username}</h4>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Chats
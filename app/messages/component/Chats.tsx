// import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react'

// const Chats = async () => {
//     const fetchChats = async () => {
//         try {
//             const token = cookies().get('token_auth')?.value;
//             const res = await fetch(`${process.env.BASE_URL}/api/messages/chat`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (!res.ok) {
//                 throw new Error(await res.text());
//             }
//             return await res.json();
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     const data = await fetchChats();
//     console.log(data?.chats);

//     return (
//         <div className='border-r-2 w-full h-full'>
//             {data?.chats?.map((chat: any) => {
//                 return (
//                     <Link href={`/messages?userId=${chat.user.id}&chatId=${chat.id}`} key={chat.id}>
//                         <div className='flex items-center gap-1 w-full border-b-2 px-3 py-2'>
//                             <div>
//                                 {chat.user.pictrue ?
//                                     <Image
//                                         src={chat.user.pictrue as string}
//                                         height={50}
//                                         width={50}
//                                         className='w-8 h-8 rounded-full'
//                                         alt=''
//                                     /> : <div className='w-10 h-10 bg-red-400 rounded-full flex justify-center items-center text-white font-medium'>
//                                         {
//                                             chat?.user?.username?.split("")[0]
//                                         }
//                                     </div>
//                                 }
//                             </div>
//                             <h4 className='font-medium'>{chat.user.username}</h4>
//                         </div>
//                     </Link>
//                 )
//             })}
//         </div>
//     )
// }

// export default Chats
'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useContextMsgApp } from '../contxt-msg/ContextMsg';

const Chats = () => {
    const context = useContextMsgApp();
    console.log(context);


    return (
        <div className='border-r-2 w-full h-full'>
            {context?.chats?.map((chat: any) => {
                return (
                    <Link href={`/messages?userId=${chat.user.id}&chatId=${chat.id}`} key={chat.id}>
                        <div className='flex items-center gap-1 w-full border-b-2 px-3 py-2'>
                            <div>
                                {chat.user.picture ?
                                    <Image
                                        src={chat?.user?.picture as string}
                                        height={50}
                                        width={50}
                                        className='w-10 h-10 rounded-full'
                                        alt=''
                                    /> : <div className='w-10 h-10 bg-red-400 rounded-full flex justify-center items-center text-white font-medium'>
                                        {
                                            chat.user.username?.split("")[0]
                                        }
                                    </div>
                                }
                            </div>
                            <h4 className='font-medium'>{chat.user.username}</h4>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Chats
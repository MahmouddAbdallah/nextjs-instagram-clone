import React from 'react'
import Link from 'next/link'
import UserStatus from './UserStatus'
import { cookies } from 'next/headers';
import Image from 'next/image';


const Statuses = async () => {

    const fetchStatuses = async () => {
        try {
            const token = cookies().get('token_auth')?.value;
            const res = await fetch(`${process.env.BASE_URL}/api/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error(await res.text());
            }
            return await res.json();
        } catch (error: any) {
            console.error(error.message);
        }
    }
    const data = await fetchStatuses()

    return (
        <div className='px-2 md:px-10 lg:pl-52 border-b-2 sm:border-b-0 py-2'>
            <ul className='flex gap-2 lg:gap-3 max-w-[650px] overflow-x-auto hide-scrollbar'>
                <li>
                    <UserStatus />
                </li>
                {
                    data?.statuses?.map(
                        (status: any) => {
                            const username = status.user.username as string
                            return (
                                <li key={status.id}>
                                    <div className="flex flex-col items-center">
                                        <Link href={`/status/${status.user.id}`} className='lg:w-16 w-14 h-14 lg:h-16 rounded-full nimate-pulse gradient-status flex items-center justify-center'>
                                            <div className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] bg-slate-200 rounded-full overflow-hidden">
                                                <div>
                                                    {status.user.picture ?
                                                        <Image
                                                            height={500}
                                                            width={500}
                                                            className="object-cover w-full "
                                                            src={status.user.picture as string}
                                                            alt=""
                                                        />
                                                        :
                                                        <div className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] rounded-full bg-pink-400 uppercase flex items-center justify-center text-sm lg:text-xl font-medium text-white">
                                                            {status.user?.username?.split("")[0]}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                        <div>
                                            <span className="text-xs">{username.length > 7 ? username.slice(0, 7) + "..." : username}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default Statuses
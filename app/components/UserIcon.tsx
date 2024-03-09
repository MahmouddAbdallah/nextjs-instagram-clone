'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../context/appContext';
const UserIcon = () => {
    const context = useAppContext()

    return (
        <div className='h-fit w-full relative'>
            {context?.user?.name ?
                <Link href={`/profile/${context?.user.id}`} className='w-full h-full flex justify-center py-2 '>
                    <div className='flex items-center gap-3 '>
                        <div>
                            {context?.user.picture ?
                                <Image
                                    width={10}
                                    height={10}
                                    src={context?.user.picture}
                                    alt={`instagram profile of user : ${context?.user?.name}`}
                                />
                                :
                                <div className='bg-red-400 text-xs flex justify-center items-center text-white font-semibold rounded-full w-6 h-6'>
                                    <span>
                                        {context?.user?.name?.split("")[0]?.toUpperCase()}
                                    </span>
                                </div>
                            }
                        </div>
                        <span className={
                            'text-sm text-black/80 hidden xl:block'
                        }>
                            Profile
                        </span>
                    </div>
                </Link>
                :
                <div className='bg-slate-200 animate-pulse font-semibold rounded-full w-6 h-6' />
            }
        </div>
    )
}

export default UserIcon
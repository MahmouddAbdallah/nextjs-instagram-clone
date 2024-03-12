'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useAppContext } from '../context/appContext';
import Image from 'next/image';
import clsx from 'clsx';

const UserIcon = () => {
    const pathname = usePathname();
    const context = useAppContext()

    return (
        <div className='h-fit w-full relative'>
            {context?.user?.name ?
                <Link href={`/profile/${context?.user.id}`} className='w-full h-full flex justify-center py-2 '>
                    <div className='flex items-center gap-3 '>
                        <div>
                            {context?.user.picture ?
                                <div className={clsx(
                                    'w-6 h-6 overflow-hidden rounded-full flex justify-center items-center',
                                    {
                                        'border-2 border-black': pathname?.includes('profile')
                                    }
                                )}>
                                    <Image
                                        width={50}
                                        height={50}
                                        className='h-full w-full object-cover'
                                        src={context?.user.picture}
                                        alt={`instagram profile of user : ${context?.user?.name}`}
                                    />
                                </div>
                                :
                                <div className={clsx(
                                    'bg-red-400 text-xs flex justify-center items-center text-white font-semibold rounded-full w-6 h-6 border',
                                    {
                                        'border-2 border-black/70': pathname?.includes('profile')
                                    }
                                )}>
                                    <span>
                                        {
                                            context?.
                                                user?.
                                                name?.
                                                split("")[0]?.
                                                toUpperCase()
                                        }
                                    </span>
                                </div>
                            }
                        </div>
                        <span className=
                            {clsx(
                                'text-sm text-black/80 hidden xl:block',
                                {
                                    'font-bold': pathname?.includes('profile')
                                }
                            )}>
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
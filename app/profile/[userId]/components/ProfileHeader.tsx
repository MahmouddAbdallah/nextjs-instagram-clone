'use client'
import { userTypes } from '@/app/types/user'
import UploadImg from './UploadImg'
import Image from 'next/image';
import { IoIosSettings } from "react-icons/io";
import { useAppContext } from '@/app/context/appContext';

interface user {
    user: userTypes | null
}

const ProfileHeader: React.FC<user> = ({ user }) => {
    const context = useAppContext();

    return (
        <div className='px-10 py-10'>
            <div className='flex gap-5'>
                <div className="relative h-fit">
                    {
                        user?.picture ?
                            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden relative flex justify-center items-center border border-black/20'>
                                <Image
                                    src={user.picture}
                                    alt="Picture of the author"
                                    className='h-full w-full object-cover'
                                    width={500}
                                    height={300}
                                    priority={true}
                                />
                            </div>
                            :
                            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-slate-100 rounded-full overflow-hidden relative flex justify-center items-center border border-black/20'>
                                <div className='bg-red-400 text-4xl flex justify-center items-center text-white w-full h-full'>
                                    <span>
                                        {user?.name?.split("")[0]?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                    }
                    {
                        user?.id === context?.user.id &&
                        <div className='absolute w-full h-full top-0'>
                            <UploadImg picture={user?.picture} />
                        </div>
                    }
                </div>
                <div className='space-y-5'>
                    <div className='flex flex-wrap gap-5'>
                        <h3 className='text-lg font-semibold'>{user?.username}</h3>
                        <div className='space-x-3'>
                            <button className='bg-black/5 rounded-md px-5 py-1 whitespace-nowrap text-xs font-semibold'>Edit profile</button>
                            <button className='bg-black/5 rounded-md px-5 py-1 whitespace-nowrap text-xs font-semibold'>View archive</button>
                        </div>
                        <div>
                            <IoIosSettings size={25} />
                        </div>
                    </div>
                    <div className='space-y-5'>
                        <div className='flex gap-5'>
                            <span className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    0
                                </span>
                                posts
                            </span>
                            <button className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    0
                                </span>
                                followers
                            </button>
                            <button className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    0
                                </span>
                                following
                            </button>
                        </div>
                        <div>
                            <span className='font-semibold text-sm'>{user?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default ProfileHeader
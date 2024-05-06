'use client'
import { useEffect, useCallback, useState } from 'react'
import { userTypes } from '@/app/types/user'
import UploadImg from './UploadImg'
import Image from 'next/image';
import { IoIosSettings } from "react-icons/io";
import { useAppSelector } from '@/app/hooks/reduxHooks';
import axios from 'axios'
import { useParams } from 'next/navigation'
import FollowBtn from './FollowBtn';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';

const ProfileHeader = () => {
    const { userId } = useParams()
    const [user, setUser] = useState<userTypes>()
    const [postsNum, setPostsNum] = useState(0)
    const [followingNum, setFollowingNum] = useState(0)
    const [followerNum, setFollowerNum] = useState(0)
    const userInfo = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`/api/user/user-info?userId=${userId}`)
                setUser(data.user)
                setPostsNum(data.postNumber)
                setFollowingNum(data.followingNumber)
                setFollowerNum(data.followerNumber)
            } catch (error: any) {
                toast.error(error?.response?.data?.message || 'There is an Error')
                console.error({ error });
            }
        }, [userId]
    )
    useEffect(() => {
        userInfo()
    }, [userInfo])

    useEffect(() => {
        document.title = user?.name || "Anonymous"
    }, [user])

    const userApp = useAppSelector((state) => state.user)

    return (
        <div className=''>
            <div className='flex gap-5 px-5 py-10'>
                <div className="relative h-fit">
                    {
                        user?.picture ?
                            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden relative flex justify-center items-center border border-black/20'>
                                {
                                    user.id == userApp.id ?
                                        <Image
                                            src={userApp.picture as string}
                                            alt="Picture of the author"
                                            className='h-full w-full object-cover'
                                            width={500}
                                            height={300}
                                        /> :
                                        <Image
                                            src={user.picture as string}
                                            alt="Picture of the author"
                                            className='h-full w-full object-cover'
                                            width={500}
                                            height={300}
                                        />
                                }
                            </div>
                            :
                            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-slate-100 rounded-full overflow-hidden relative flex justify-center items-center border border-black/20'>
                                <div className={clsx(
                                    'text-4xl flex justify-center items-center text-white w-full h-full',
                                    { "bg-red-400": user?.name },
                                    { "bg-slate-200 animate-pulse": !user?.name }
                                )}>
                                    <span>
                                        {user?.name?.split("")[0]?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                    }
                    {
                        user?.id === userApp.id &&
                        <div className='absolute w-full h-full top-0 z-50'>
                            <UploadImg />
                        </div>
                    }
                </div>
                <div className='space-y-5'>
                    <div className='flex flex-wrap gap-5'>
                        <h3 className='text-lg font-semibold'>{user?.username}</h3>
                        {user?.id == userApp.id ?
                            <div className='flex gap-5 items-center'>
                                <div className='space-x-3'>
                                    <button className='bg-black/5 rounded-md px-7 py-2 whitespace-nowrap text-xs font-semibold'>Edit profile</button>
                                    <button className='bg-black/5 rounded-md px-7 py-2 whitespace-nowrap text-xs font-semibold'>View archive</button>
                                </div>
                                <div>
                                    <IoIosSettings size={25} />
                                </div>
                            </div>
                            :
                            <div className='space-x-3'>
                                <FollowBtn />
                                <button className='bg-black/5 rounded-md px-7 py-2 whitespace-nowrap text-xs font-semibold'>
                                    Message
                                </button>
                            </div>
                        }
                    </div>
                    <div className='space-y-5'>
                        <div className='hidden sm:flex gap-5'>
                            <span className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {postsNum}
                                </span>
                                posts
                            </span>
                            <button className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {followerNum}
                                </span>
                                followers
                            </button>
                            <button className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {followingNum}
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
        </div>
    )
}

export default ProfileHeader
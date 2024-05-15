'use client'
import { useEffect, useState, } from 'react'
import UploadImg from './UploadImg'
import Image from 'next/image';
import { IoIosHeart, IoIosSettings } from "react-icons/io";
import { useAppSelector } from '@/app/hooks/reduxHooks';
import FollowBtn from './FollowBtn';
import clsx from 'clsx';
import NavbarPosts from './NavbarPosts';
import Settings from '@/app/components/Settings';
import useClickOutside from '@/app/hooks/useClickOutside';
import Link from 'next/link';
import Followers from './Followers';
import Following from './Following';

const ProfileHeader = ({ data }: { data: any }) => {
    const [openSettings, setOpenSetting] = useState(false)
    const refElement = useClickOutside(() => { setOpenSetting(false) })
    const [openFollower, setOpenFollwer] = useState(false)
    const [openFollowing, setOpenFollwing] = useState(false)
    useEffect(() => {
        document.title = data?.user?.name || "Anonymous"
    }, [data?.user])
    const userApp = useAppSelector((state) => state.user)


    return (
        <div className=''>
            <div className='block sm:hidden border-b-2'>
                <div className='py-1 px-2 flex items-center justify-between'>
                    <div ref={refElement} className='z-20'>
                        <button
                            onClick={() => { setOpenSetting(!openSettings) }}
                            className='block'>
                            <IoIosSettings size={30} className='fill-black/80 ' />
                        </button>
                        <Settings open={openSettings} />
                    </div>
                    <div className='flex items-center gap-1'>
                        <button>
                            <IoIosHeart className='fill-transparent stroke-black/70 stroke-[40px] w-6 h-6' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 px-5 py-10'>
                <div className="relative h-fit">
                    {
                        data?.user?.picture ?
                            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden relative flex justify-center items-center border border-black/20'>
                                {
                                    data?.user.id == userApp.id ?
                                        <Image
                                            src={userApp.picture as string}
                                            alt="Picture of the author"
                                            className='h-full w-full object-cover'
                                            width={500}
                                            height={300}
                                        /> :
                                        <Image
                                            src={data?.user.picture as string}
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
                                    { "bg-red-400": data?.user?.name },
                                    { "bg-slate-200 animate-pulse": !data?.user?.name }
                                )}>
                                    <span>
                                        {data?.user?.name?.split("")[0]?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                    }
                    {
                        data?.user?.id === userApp.id &&
                        <div className='absolute w-full h-full top-0 '>
                            <UploadImg />
                        </div>
                    }
                </div>
                <div className='space-y-5'>
                    <div className='flex flex-wrap gap-5'>
                        <h3 className='text-lg font-semibold'>{data?.user?.username}</h3>
                        {data?.user?.id == userApp.id ?
                            <div className='flex gap-3 sm:gap-5 items-center'>
                                <div className='space-x-3'>
                                    <button className='bg-black/5 rounded-md px-4 sm:px-7 py-2 whitespace-nowrap text-xs font-semibold'>Edit profile</button>
                                    <button className='bg-black/5 rounded-md px-4 sm:px-7 py-2 whitespace-nowrap text-xs font-semibold'>View archive</button>
                                </div>
                                <div className='hidden sm:block'>
                                    <IoIosSettings size={25} />
                                </div>
                            </div>
                            :
                            <div className='space-x-3'>
                                <FollowBtn />
                                <Link href={`/messages?userId=${data?.user?.id}`} className='bg-black/5 rounded-md px-7 py-2 whitespace-nowrap text-xs font-semibold'>
                                    Message
                                </Link>
                            </div>
                        }
                    </div>
                    <div className='space-y-5'>
                        <div className='hidden sm:flex gap-5'>
                            <span className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {data?.postNumber}
                                </span>
                                posts
                            </span>
                            <button
                                onClick={() => {
                                    setOpenFollwer(true)
                                    document.body.style.overflowY = 'hidden'
                                }}
                                className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {data?.followerNumber}
                                </span>
                                followers
                            </button>
                            <button
                                onClick={() => {
                                    setOpenFollwing(true)
                                    document.body.style.overflowY = 'hidden'
                                }}
                                className='text-sm'>
                                <span className='mr-1 font-semibold'>
                                    {data?.followingNumber}
                                </span>
                                following
                            </button>
                        </div>
                        <div>
                            <span className='font-semibold text-sm'>{data?.user?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarPosts
                postsNum={data?.postNumber}
                followerNum={data?.followerNumber}
                followingNum={data?.followingNumber}
                setOpenFollwer={setOpenFollwer}
                setOpenFollwing={setOpenFollwing}
            />
            {openFollower && <Followers setOpen={setOpenFollwer} userId={data?.user?.id} />}
            {openFollowing && <Following setOpen={setOpenFollwing} userId={data?.user?.id} />}
        </div>
    )
}

export default ProfileHeader
'use client'
import { SavedIcon, TagIcon } from '@/app/components/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { GiAbstract050 } from "react-icons/gi";


interface props {
    postsNum: number;
    followerNum: number;
    followingNum: number;
    setOpenFollwer: React.Dispatch<React.SetStateAction<boolean>>
    setOpenFollwing: React.Dispatch<React.SetStateAction<boolean>>
}
const NavbarPosts: React.FC<props> = ({ postsNum, followerNum, followingNum, setOpenFollwing, setOpenFollwer }) => {

    const pathname = usePathname();
    const userId = pathname?.split('/')[2]

    return (
        <div>
            <div className='w-full flex border-t sm:hidden'>
                <button className='w-full flex flex-col items-center text-xs py-3'>
                    <span className='font-semibold'>
                        {postsNum}
                    </span>
                    <span className='text-black/50'>
                        Posts
                    </span>
                </button>
                <button
                    onClick={() => {
                        setOpenFollwer(true)
                        document.body.style.overflowY = 'hidden'
                    }}
                    className='w-full flex flex-col items-center text-xs py-3'>
                    <span className='font-semibold'>
                        {followerNum}
                    </span>
                    <span className='text-black/50'>
                        followers
                    </span>
                </button>
                <button
                    onClick={() => {
                        setOpenFollwing(true)
                        document.body.style.overflowY = 'hidden'
                    }}
                    className='w-full flex flex-col items-center text-xs py-3'>
                    <span className='font-semibold'>
                        {followingNum}
                    </span>
                    <span className='text-black/50'>
                        following
                    </span>
                </button>
            </div>
            <div className='w-full flex sm:justify-center border-y sm:border-y-0 sm:border-t'>
                <Link href={`/profile/${userId}`} className={clsx(
                    'w-full sm:w-fit sm:px-5 flex justify-center items-center gap-3 text-[11px] py-3 group focus:border-t border-black',
                    { 'border-t border-black': !pathname?.includes('saved') && !pathname?.includes('tags') }
                )}>
                    <span className='font-semibold'>
                        <GiAbstract050 className={clsx(
                            'text-xl sm:text-sm',
                            { 'fill-blue-500': !pathname?.includes('saved') && !pathname?.includes('tags') }
                        )} />
                    </span>
                    <span className='text-black/70 hidden sm:block'>
                        POSTS
                    </span>
                </Link >
                <Link href={`/profile/${userId}/saved`} className={clsx(
                    'w-full sm:w-fit sm:px-5 flex justify-center items-center gap-3 text-[11px] py-3 group focus:border-t border-black',
                    { 'border-t border-black': pathname?.includes('saved') }
                )}>
                    <span className='font-semibold'>
                        <SavedIcon className={clsx(
                            'sm:h-4 sm:w-4',
                            { 'text-blue-500': pathname?.includes('saved') }
                        )} />
                    </span>
                    <span className='text-black/70 hidden sm:block'>
                        SAVED
                    </span>
                </Link>
                <Link href={`/profile/${userId}/tags`} className={clsx(
                    'w-full sm:w-fit sm:px-5 flex justify-center items-center gap-3 text-[11px] py-3 group focus:border-t border-black',
                    { 'border-t border-black': pathname?.includes('tags') }
                )}>
                    <span className='font-semibold'>
                        <TagIcon className={clsx(
                            'sm:h-4 sm:w-4 ',
                            { 'text-blue-500': pathname?.includes('tags') }
                        )} />
                    </span>
                    <span className='text-black/70 hidden sm:block'>
                        TAGS
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default NavbarPosts
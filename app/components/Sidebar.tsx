import React from 'react'
import { InstagramIcon } from './icons'
import NavsItems from './NavsItems'
import { FaInstagram } from "react-icons/fa";
import Link from 'next/link';
import UserIcon from './UserIcon';

const Sidebar = () => {

    return (
        <div className='border fixed sm:static w-full sm:w-fit sm:h-screen bottom-0  left-0 px-3 xl:pl-4 xl:pr-32'>
            <div className='flex flex-col justify-between h-full sm:pb-10'>
                <div>
                    <div className='mt-12 mb-14 xl:mt-0 xl:mb-0 hidden sm:block'>
                        <InstagramIcon className='w-20 h-20 fill-black/80 hidden xl:block' />
                        <Link href={'/'}>
                            <FaInstagram size={24} className='fill-black/80 block xl:hidden' />
                        </Link>
                    </div>
                    <NavsItems />
                </div>
                <div className='hidden sm:block'>
                    <div className=''>
                        <UserIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
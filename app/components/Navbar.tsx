import React from 'react'
import { InstagramIcon } from './icons'
import Link from 'next/link'
import { IoIosHeart } from "react-icons/io";
import CreatePost from './CreatePost';


const Navbar = () => {
    return (
        <nav className='block sm:hidden border-b-2 sticky z-50 top-0 bg-white'>
            <div className='py-1 px-2 flex items-center justify-between'>
                <div className=''>
                    <Link href={'/'} className='block'>
                        <InstagramIcon className='fill-black/80 w-24' />
                    </Link>
                </div>
                <div className='flex items-center gap-1'>
                    <div>
                        <CreatePost />
                    </div>
                    <button>
                        <IoIosHeart className='fill-transparent stroke-black/70 stroke-[40px] w-6 h-6' />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
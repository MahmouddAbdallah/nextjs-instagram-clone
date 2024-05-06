import React from 'react'
import { InstagramIcon } from './../components/icons'
import Link from 'next/link'
import { IoMdClose } from "react-icons/io";
import CreateStatus from './component/CreateStatus';
const page = () => {
    return (
        <div className="h-svh w-svh bg-black/85 relative">
            <nav className='px-5 flex justify-between items-center absolute w-full'>
                <Link href={'/'}>
                    <InstagramIcon className='w-28 h-16 fill-white' />
                </Link>
                <Link href='/'>
                    <IoMdClose size={25} fill="white" />
                </Link>
            </nav>
            <div className="flex justify-center h-full items-center">
                <CreateStatus />
            </div>
        </div>
    )
}

export default page
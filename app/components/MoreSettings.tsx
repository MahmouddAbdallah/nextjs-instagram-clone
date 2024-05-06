'use client'
import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import useClickOutside from '../hooks/useClickOutside';
import toast from 'react-hot-toast';
import axios from 'axios';
import clsx from 'clsx';
import Settings from './Settings';

const MoreSettings = () => {
    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => { setOpen(false); })
    return (
        <div ref={refElement} className='relative'>
            <button onClick={() => { setOpen(!open) }} className='hidden sm:flex items-center gap-3 py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-56 rounded-lg'>
                <AiOutlineMenu className={clsx(
                    'w-5 lg:w-7 h-5 lg:h-7',
                    { 'stroke-[30px]': open }
                )} />
                <span className={clsx(
                    'text-sm text-black/80 hidden xl:block',
                    { "font-bold": open }
                )}>
                    More
                </span>
            </button>
            <Settings open={open} />
        </div>
    )
}

export default MoreSettings
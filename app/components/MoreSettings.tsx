'use client'
import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import useClickOutside from '../hooks/useClickOutside';
import clsx from 'clsx';
import Settings from './Settings';
import { usePathname } from 'next/navigation';

const MoreSettings = () => {
    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => { setOpen(false); })
    const pathname = usePathname();

    return (
        <div ref={refElement} className='relative'>
            <button onClick={() => { setOpen(!open) }} className='hidden sm:flex items-center gap-3 py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-full rounded-lg'>
                <AiOutlineMenu className={clsx(
                    'w-5 lg:w-7 h-5 lg:h-7',
                    { 'stroke-[30px]': open }
                )} />
                <span className={clsx(
                    'text-sm text-black/80 ',
                    { "font-bold": open },
                    { "hidden": pathname.startsWith('/messages') },
                    { "hidden xl:block": !(pathname.startsWith('/messages')) }
                )}>
                    More
                </span>
            </button>
            <Settings open={open} />
        </div>
    )
}

export default MoreSettings
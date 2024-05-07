'use client'
import React from 'react'
import { InstagramIcon } from './icons'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const SidebarIcon = () => {
    const pathname = usePathname();

    return (
        <div className={clsx(
            'mt-12 mb-14 hidden sm:block  ',
            { "xl:mt-0 xl:mb-0 xl:pl-3": !(pathname.startsWith('/messages')) }
        )}>
            <div>
                <Link href={'/'}>
                    <InstagramIcon className={clsx(
                        'w-28 h-28 fill-black/80',
                        { "hidden": pathname.startsWith('/messages') },
                        { "hidden xl:block": !(pathname.startsWith('/messages')) }
                    )} />
                </Link>
            </div>
            <div>
                <Link href={'/'} className="block px-3">
                    <FaInstagram size={24} className={clsx(
                        'fill-black/80 block ',
                        { "xl:block w-[28px] h-[28px]": pathname.startsWith('/messages') },
                        { "xl:hidden": !(pathname.startsWith('/messages')) }
                    )} />
                </Link>
            </div>
        </div>
    )
}

export default SidebarIcon
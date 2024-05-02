'use client';
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MdOutlineExplore, MdExplore, MdOutlineSearch } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsSend, BsFillSendFill } from "react-icons/bs";
import Link from 'next/link';
import clsx from 'clsx';
import CreatePost from './CreatePost';
import UserIcon from './UserIcon';
import { InstagramIcon } from './icons'
import { FaInstagram } from "react-icons/fa";
import Search from './Search';
import useClickOutside from '../hooks/useClickOutside';

const Sidebar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false)
    const navItems = [
        {
            name: 'Home',
            icon: pathname === '/' ? <GoHomeFill size={24} /> : <GoHome size={24} />,
            href: "/"
        },
        {
            name: 'Search',
        },
        {
            name: 'Create',
        },
        {
            name: 'Explore',
            icon: pathname === '/explore' ? <MdExplore size={24} /> : <MdOutlineExplore size={24} />,
            href: "/explore"
        },
        {
            name: 'Messages',
            icon: pathname === '/messages' ? < BsFillSendFill className='stroke-[.5px]' size={21} /> : <BsSend className='stroke-[.5px]' size={21} />,
            href: "/messages"
        },
    ]
    const refElement = useClickOutside(() => { setOpen(false); })

    return (
        <div ref={refElement} className='border border-black/20 bg-white fixed sm:sticky z-[999] sm:top-0 w-full sm:w-fit sm:h-screen bottom-0 left-0 xl:pl-4 px-3 py-2 sm:py-0'>
            <div className="relative h-full">
                <div className='flex flex-col justify-between h-full sm:pb-10'>
                    <div>
                        <div className='mt-12 mb-14 xl:mt-0 xl:mb-0 hidden sm:block xl:pl-3 '>
                            <Link href={'/'}>
                                <InstagramIcon className='w-28 h-28 fill-black/80 hidden xl:block' />
                            </Link>
                            <Link href={'/'} className="block px-3">
                                <FaInstagram size={24} className='fill-black/80 block xl:hidden' />
                            </Link>
                        </div>
                        <ul className='flex justify-between items-center sm:block sm:space-y-3 '>
                            {
                                navItems.map(nav =>
                                    <li key={nav.name} className={clsx(
                                        'h-fit w-full relative flex justify-center sm:justify-normal',
                                        { "hidden sm:block": nav.name == 'Search' }
                                    )}>
                                        {
                                            nav.name == 'Create' ?
                                                <CreatePost />
                                                :
                                                nav.name == "Search" ?
                                                    <div ref={refElement}>
                                                        <button
                                                            onClick={() => setOpen(!open)}
                                                            className='block py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-56 rounded-lg'>
                                                            <div className='flex items-center gap-3'>
                                                                <div>
                                                                    <MdOutlineSearch size={24} />
                                                                </div>
                                                                <span className={clsx(
                                                                    'text-sm text-black/80 hidden xl:block',
                                                                )}>
                                                                    Search
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    :
                                                    <Link
                                                        onClick={() => setOpen(false)}
                                                        href={nav.href ? nav.href : "/"} className='block py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-56 rounded-lg'>
                                                        <div className='flex items-center gap-3'>
                                                            <div>
                                                                {nav.icon}
                                                            </div>
                                                            <span className={clsx(
                                                                'text-sm text-black/80 hidden xl:block',
                                                                { 'font-bold': nav.href == pathname }
                                                            )}>
                                                                {nav.name}
                                                            </span>
                                                        </div>
                                                    </Link>
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='block'>
                        <div className=''>
                            <UserIcon />
                        </div>
                    </div>
                </div>
                {open && <Search />}
            </div>
        </div>
    )
}

export default Sidebar
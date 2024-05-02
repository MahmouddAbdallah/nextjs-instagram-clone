'use client';
import { usePathname } from 'next/navigation'
import { MdOutlineExplore, MdExplore, MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsSend, BsFillSendFill } from "react-icons/bs";
import Link from 'next/link';
import clsx from 'clsx';
import CreatePost from './CreatePost';
import UserIcon from './UserIcon';
import Search from './Search';

const NavsItems = () => {
    const pathname = usePathname();
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

    return (
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
                                    <Search />
                                    :
                                    <Link href={nav.href ? nav.href : "/"} className='block py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-48 rounded-lg'>
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
            <li className='h-fit w-full relative block sm:hidden'>
                <UserIcon />
            </li>
        </ul>
    )
}

export default NavsItems
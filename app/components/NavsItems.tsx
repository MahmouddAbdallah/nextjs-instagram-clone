'use client';
import { usePathname } from 'next/navigation'
import { MdOutlineSearch, MdOutlineExplore, MdExplore, MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsSend, BsFillSendFill } from "react-icons/bs";
import Link from 'next/link';
import clsx from 'clsx';

const NavsItems = () => {
    const pathname = usePathname();
    const navItems = [
        {
            name: 'Home',
            icon: pathname === '/' ? <GoHomeFill size={23} /> : <GoHome size={23} />,
            href: "/"
        },
        {
            name: 'Search',
            icon: <MdOutlineSearch size={23} />,
            href: "/search"
        },
        {
            name: 'Explore',
            icon: pathname === '/explore' ? <MdExplore size={23} /> : <MdOutlineExplore size={23} />,
            href: "/explore"
        },
        {
            name: 'Messages',
            icon: pathname === '/messages' ? < BsFillSendFill size={23} /> : <BsSend size={23} />,
            href: "/messages"
        },
        {
            name: 'Create',
            icon: pathname === '/post' ? <MdAddCircle size={23} /> : <MdAddCircleOutline size={23} />,
            href: "/post"
        },
    ]
    return (
        <ul className='flex justify-between items-center sm:block sm:space-y-7 '>
            {
                navItems.map(nav =>
                    <li key={nav.name} className='h-fit w-full'>
                        <Link href={nav.href} className='w-full h-full flex justify-center py-2'>
                            <div className='flex items-center gap-3 '>
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
                    </li>
                )
            }
        </ul>
    )
}

export default NavsItems
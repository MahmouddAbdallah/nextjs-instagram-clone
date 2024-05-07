import { usePathname } from 'next/navigation'
import { MdOutlineExplore, MdExplore, MdOutlineSearch } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsSend, BsFillSendFill } from "react-icons/bs";
import Link from 'next/link';
import clsx from 'clsx';
import CreatePost from './CreatePost';
import UserIcon from './UserIcon';
import Search from './Search';
import { useAppSelector } from '../hooks/reduxHooks';

const NavItems = () => {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.user)
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
            icon: pathname === '/messages' ? < BsFillSendFill className='stroke-[.2px]' size={21} /> : <BsSend className='stroke-[.2px]' size={21} />,
            href: "/messages"
        },
        {
            name: 'Profile',
        },
    ]
    return (
        <ul className='flex justify-between items-center sm:block sm:space-y-3 '>
            {
                navItems.map(nav =>
                    nav.name == 'Create'
                        ?
                        <li key={nav.name} className='h-fit w-full hidden sm:block'>
                            <CreatePost />
                        </li>
                        :
                        nav.name == 'Search'
                            ?
                            <li
                                key={nav.name}
                                className='h-fit w-full relative flex justify-center sm:justify-normal'
                            >
                                <Search />
                            </li>
                            :
                            nav.name == 'Profile'
                                ?
                                <li
                                    className='h-fit w-full relative flex justify-center sm:justify-normal'
                                    key={nav.name}>
                                    <UserIcon />
                                </li>
                                :
                                <li key={nav.name} className='h-fit w-full relative flex justify-center sm:justify-normal'>
                                    <Link
                                        href={nav.href || pathname}
                                        className={clsx(
                                            'flex items-center gap-3 py-2 sm:py-3 hover:bg-black/5 px-3  rounded-lg',
                                            { "xl:pl-3 xl:w-56": !(pathname.startsWith('/messages')) }
                                        )}
                                    >
                                        <div>
                                            {nav.icon}
                                        </div>
                                        <div className={clsx(
                                            'text-sm text-black/80 ',
                                            { 'font-bold': nav.href == pathname },
                                            { "hidden": pathname.startsWith('/messages') },
                                            { "hidden xl:block": !(pathname.startsWith('/messages')) }
                                        )}>
                                            {nav.name}
                                        </div>
                                    </Link>
                                </li>
                )
            }
        </ul>
    )
}

export default NavItems
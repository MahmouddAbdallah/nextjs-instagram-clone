'use client'
import { usePathname } from 'next/navigation';
import MoreSettings from './MoreSettings';
import NavItems from './NavItems';
import SidebarIcon from './SidebarIcon';
import clsx from 'clsx';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className={clsx(
            { "hidden sm:block": pathname.startsWith('/messages') },
        )}>
            <div className='border border-black/20 bg-white fixed sm:sticky z-50 sm:top-0 w-full sm:w-fit sm:h-screen bottom-0 left-0 xl:pl-4 px-3 py-2 sm:py-0'>
                <div className="relative h-full">
                    <div className='flex flex-col justify-between h-full sm:pb-10'>
                        <div>
                            <SidebarIcon />
                            <NavItems />
                        </div>
                        <div>
                            <MoreSettings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
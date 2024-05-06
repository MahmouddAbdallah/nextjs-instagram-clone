import Link from 'next/link';
import { InstagramIcon } from './icons'
import { FaInstagram } from "react-icons/fa";
import MoreSettings from './MoreSettings';
import NavItems from './NavItems';

const Sidebar = () => {


    return (
        <div className='border border-black/20 bg-white fixed sm:sticky z-50 sm:top-0 w-full sm:w-fit sm:h-screen bottom-0 left-0 xl:pl-4 px-3 py-2 sm:py-0'>
            <div className="relative h-full">
                <div className='flex flex-col justify-between h-full sm:pb-10'>
                    <div>
                        <div className='mt-12 mb-14 xl:mt-0 xl:mb-0 hidden sm:block xl:pl-3 '>
                            <div>
                                <Link href={'/'}>
                                    <InstagramIcon className='w-28 h-28 fill-black/80 hidden xl:block' />
                                </Link>
                            </div>
                            <div>
                                <Link href={'/'} className="block px-3">
                                    <FaInstagram size={24} className='fill-black/80 block xl:hidden' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <NavItems />
                        </div>
                    </div>
                    <div>
                        <MoreSettings />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
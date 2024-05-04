import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import useClickOutside from '../hooks/useClickOutside';
import toast from 'react-hot-toast';
import axios from 'axios';
import clsx from 'clsx';

const MoreSettings = () => {

    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => { setOpen(false); })
    const logout = async () => {
        try {
            localStorage.clear();
            const { data } = await axios.get('/api/logout');
            toast.success(data.message)
            window.location.reload()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'There is an Error')
            console.error({ error });
        }
    }
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
            {open && <div className='absolute bottom-14 bg-white py-5 border rounded-md w-56'>
                <ul className='w-full px-3 space-y-3'>
                    <li className="w-full">
                        <button className='py-3 px-2 hover:bg-black/5 duration-150 w-full text-left rounded-md'>
                            Switch Accout
                        </button>
                    </li>
                    <li className="w-full">
                        <button onClick={logout} className='py-3 px-2 hover:bg-black/5 duration-150 w-full text-left rounded-md'>
                            Log out
                        </button>
                    </li>
                </ul>
            </div>}
        </div>
    )
}

export default MoreSettings
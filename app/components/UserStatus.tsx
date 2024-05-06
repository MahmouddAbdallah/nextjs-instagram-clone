'use client';
import Link from 'next/link'
import { useAppSelector } from '../hooks/reduxHooks';
import Image from 'next/image';
import { FaPlus } from "react-icons/fa6";

const UserStatus = () => {
    const user = useAppSelector((state) => state.user)

    return (
        <div className='relative'>
            <Link href='/status' className='w-16 h-16 rounded-full flex items-center justify-center'>
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-slate-200 rounded-full overflow-hidden">
                    {user.picture ? <Image
                        height={500}
                        width={500}
                        className="object-cover w-full "
                        src={user.picture as string}
                        alt=""
                    />
                        :
                        <div className="w-full h-full bg-red-400 uppercase flex items-center justify-center text-sm lg:text-xl font-medium text-white">
                            {user?.username?.split("")[0]}
                        </div>
                    }
                </div>
            </Link>
            <div className='w-4 h-4 bg-white rounded-full absolute bottom-0 right-0 flex items-center justify-center border-2'>
                <FaPlus size={10} />
            </div>
        </div>
    )
}

export default UserStatus
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";


const OldSearch = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [searchUsers, setSearchUsers] = useState<any>();
    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        const value = JSON.parse(localStorage.getItem(key) as string)
        return value
    }
    useEffect(() => {
        setSearchUsers(getFromLocalStorage('searchUser'))
    }, [])

    const clearAll = () => {
        localStorage.removeItem('searchUser')
        setSearchUsers([])
    }
    const removeOneUser = (id: any) => {
        const searchUser = localStorage.getItem('searchUser')
        let users = JSON.parse(searchUser as '') as [];
        users = users.filter(((item: any) => item.id != id)) as []
        setSearchUsers(users)
        localStorage.setItem('searchUser', JSON.stringify(users))

    }
    return (
        searchUsers?.length ?
            <div>
                <div className='flex justify-between items-center py-2 px-4'>
                    <h6 className='font-semibold text-sm'>Recent</h6>
                    <button
                        onClick={clearAll}
                        className='text-sm text-blue-500 font-medium'>Clear all</button>
                </div>
                <ul className="py-2 px-4">
                    {searchUsers?.map((user: any) => {
                        return (
                            <li key={user.id} className='flex justify-between items-center group'>
                                <Link
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                    className="block w-full p-2 rounded-md hover:bg-black/5 duration-150"
                                    href={`/profile/${user.id}`}>
                                    <div className="w-full flex gap-2">
                                        <div>
                                            <div>
                                                {user.picture ?
                                                    <Image
                                                        height={100}
                                                        width={100}
                                                        className="rounded-full object-cover w-11 h-11"
                                                        src={user.picture as string}
                                                        alt={user.name}
                                                    />
                                                    :
                                                    <div className="w-11 h-11 rounded-full bg-red-400 uppercase flex items-center justify-center text-xl font-medium text-white">
                                                        {user?.username?.split("")[0]}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className=''>
                                            <span className='block text-sm font-medium'>{user.username}</span>
                                            <span className='block text-xs text-black/50 font-medium'>{user.name}</span>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => { removeOneUser(user.id) }}
                                    className='absolute right-5 hidden group-hover:block p-2'>
                                    <IoMdClose size={22} />
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            : ""
    )
}

export default OldSearch
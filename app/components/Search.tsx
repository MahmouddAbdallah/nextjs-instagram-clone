import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast';
import { IoIosClose } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import Link from 'next/link'
import Image from 'next/image'
import { MdOutlineSearch } from "react-icons/md";
import useClickOutside from '../hooks/useClickOutside';
import clsx from 'clsx';


const Search = () => {
    const [open, setOpen] = useState(false)
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([])


    const fetchUsers = useCallback(
        async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/user?keyword=${keyword}`)
                setLoading(false)
                setUsers(data.users)
            } catch (error: any) {
                toast.error(error?.response?.data?.message || 'There is an Error')
                setLoading(false)
                console.error({ error });
            }
        }, [keyword]
    )
    useEffect(() => {
        if (keyword) {
            fetchUsers()
        } else {
            setUsers([])
        }
    }, [keyword, fetchUsers])

    const refElement = useClickOutside(() => { setOpen(false); })

    useEffect(() => {
        if (window.innerWidth < 640 && open == true) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open])

    return (
        <div ref={refElement}>
            <div >
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
            {
                open &&
                <div className="fixed w-full left-0 sm:left-[74px] xl:left-[238px] sm:w-80 h-full border top-0 bg-white z-[999]">
                    <div className='w-full hidden sm:block'>
                        <div className='py-10 px-4'>
                            <h1 className="text-xl lg:text-2xl font-semibold">Search</h1>
                        </div>
                    </div>
                    <div className="px-4 pt-5 sm:pt-0">
                        <div className='flex items-center gap-3'>
                            <div className='w-full relative flex items-center'>
                                <input
                                    type="text"
                                    placeholder='Search'
                                    value={keyword}
                                    onChange={(e) => { setKeyword(e.target.value) }}
                                    className='py-2 px-2 rounded-lg w-full border outline-none bg-black/5 placeholder:font-light'
                                />
                                {
                                    keyword ?
                                        (loading) ?
                                            <div className="absolute right-2 w-4 h-4 flex items-center justify-center rounded-full">
                                                <LuLoader2 className="animate-spin" />
                                            </div>
                                            :
                                            <button onClick={() => {
                                                setKeyword("")
                                                setUsers([])
                                            }}
                                                className="absolute right-2 w-4 h-4 flex items-center justify-center bg-black/10 rounded-full"
                                            >
                                                <IoIosClose size={20} />
                                            </button>
                                        : ""
                                }
                            </div>
                            <button
                                onClick={() => { setOpen(false); }}
                                className='block sm:hidden text-sm font-medium'>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <ul className="py-2 px-4">
                        {users.map((user: any) => {
                            return (
                                <li key={user.id}>
                                    <Link
                                        onClick={() => { setOpen(false); }}
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
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Search
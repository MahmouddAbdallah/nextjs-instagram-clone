import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast';
import { IoIosClose } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import Link from 'next/link'
import Image from 'next/image'

const Search = () => {
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

    return (
        <div className="absolute left-[238px] w-80 h-full border top-0 bg-white z-[999]">
            <div className='w-full'>
                <div className='py-10 px-4'>
                    <h1 className="text-xl lg:text-2xl font-semibold">Search</h1>
                </div>
            </div>
            <div className="px-4">
                <div className='w-full relative flex items-center'>
                    <input
                        type="text"
                        placeholder='Search'
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        className='py-2 px-2 rounded-lg w-full border outline-none bg-black/5 placeholder:font-light'
                    />
                    {loading ? <div className="absolute right-2 w-4 h-4 flex items-center justify-center rounded-full">
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
                        </button>}
                </div>
            </div>
            <ul className="py-2 px-4">
                {users.map((user: any) => {
                    return (
                        <li key={user.id}>
                            <Link
                                className="block w-full p-2 rounded-md hover:bg-black/5 duration-150"
                                href={`/profile/${user.id}`}>
                                <div className="w-full flex gap-2">
                                    <div>
                                        <div>
                                            <Image
                                                src={user.picture}
                                                alt={user.name}
                                                height={100}
                                                width={100}
                                                className="rounded-full object-cover w-11 h-11"
                                            />
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
    )
}

export default Search
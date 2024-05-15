import { IoClose } from "react-icons/io5";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";
import useClickOutside from "@/app/hooks/useClickOutside";

const Following = ({ userId, setOpen }: { userId: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [folLoading, setFolLoading] = useState("")
    const [skip, setSkip] = useState(0)
    const [initScroll, setInitScroll] = useState(50)
    const folRef = useRef<HTMLDivElement>(null)

    const scrollSkip = () => {
        const fol = folRef.current;
        if (fol) {
            const scrollTop = fol.scrollTop;
            if (scrollTop >= initScroll) {
                setInitScroll(initScroll + 50)
                setSkip(skip + 6)
            }
        }
    };


    const fetchFollowing = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/followers/following?userId=${userId}&skip=${skip}`)
            if (skip > 0) {
                setUsers((prev) => [...prev, ...data.followers] as [])
                setLoading(false)
            }
            else {
                setUsers(data.followers);
                setLoading(false)
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'There is an Error')
            setLoading(false)
            console.error({ error });
        }
    }, [skip, userId])
    useEffect(() => {
        fetchFollowing()
    }, [fetchFollowing])

    const handleClose = () => {
        setOpen(false)
        document.body.style.overflowY = 'auto'
    }
    const refElemet = useClickOutside(handleClose)

    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black/20 z-50 flex justify-center items-center'>
            <div ref={refElemet} className='w-96 sm:w-[400px] md:w-[500px] bg-white rounded-2xl'>
                <div className='flex py-2 px-2 border-b'>
                    <div className="flex-1 text-center">
                        <span className="font-medium text-sm">
                            Following
                        </span>
                    </div>
                    <button onClick={handleClose}><IoClose size={22} /></button>
                </div>
                <div className="py-2 space-y-3">
                    <div className="px-3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-md bg-black/5 py-1 px-2 text-sm placeholder:text-sm outline-none"
                        />
                    </div>
                    <div onScroll={scrollSkip} ref={folRef} className="py-2 space-y-3 max-h-[300px] overflow-auto px-2">
                        {

                            users?.length ?
                                users?.map((fol: any) => {
                                    return (
                                        <div key={fol.id}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2 items-center">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                                        {fol?.follower?.picture ?
                                                            <Image
                                                                src={fol.follower.picture}
                                                                alt=""
                                                                height={50}
                                                                width={50}
                                                                className="object-cover h-12 w-12"
                                                            /> :
                                                            <div className="flex items-center justify-center w-12 h-12 uppercase bg-red-400 text-white font-medium">
                                                                {fol?.follower?.username?.split('')[0]}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="">
                                                        <span className="text-xs font-medium block">{fol?.follower?.username}</span>
                                                        <span className="text-xs font-medium text-black/50 block">{fol?.follower?.name}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => {
                                                    // deleteFollower(fol.id as string)
                                                }} className="text-xs font-medium px-5 py-2 rounded-lg bg-black/10 flex justify-center">
                                                    {folLoading == fol.id ? <LuLoader2 className='animate-spin w-4 h-4' /> : "Following"}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div className="text-center w-full py-10">
                                    No Followers
                                </div>

                        }
                        {(loading && users?.length) &&
                            <div className="flex justify-center w-full py-10">
                                <LuLoader2 className='animate-spin w-8 h-8' />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Following
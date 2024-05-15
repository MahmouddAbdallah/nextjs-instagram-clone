import { IoClose } from "react-icons/io5";
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";
import useClickOutside from "@/app/hooks/useClickOutside";

const Followers = ({ userId, setOpen }: { userId: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleLoading, setDeleLoading] = useState("")

    const fetchFollowers = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/followers?userId=${userId}`)
            setUsers(data.followers);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'There is an Error')
            setLoading(false)
            console.error({ error });
        }
    }, [userId])
    useEffect(() => {
        fetchFollowers()
    }, [fetchFollowers])

    const deleteFollower = async (followerId: string) => {
        try {
            setDeleLoading(followerId)
            const { data } = await axios.delete(`/api/followers?followId=${followerId}&userId=${userId}`)
            toast.success(data.message)
            setUsers((fol) => fol.filter((item: any) => item.id != followerId))
            setDeleLoading("")
        } catch (error: any) {
            setDeleLoading("")
            toast.error(error?.response?.data?.message || 'There is an Error')
            setLoading(false)
            console.error({ error });
        }
    }
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
                            Followers
                        </span>
                    </div>
                    <button onClick={handleClose}><IoClose size={22} /></button>
                </div>
                <div className="px-3 py-2">
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-md bg-black/5 py-1 px-2 text-sm placeholder:text-sm outline-none"
                        />
                    </div>
                    <div className="py-2 space-y-3">
                        {
                            users?.map((fol: any) => {
                                return (
                                    <div key={fol.id}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                                    {fol.following.picture ?
                                                        <Image
                                                            src={fol.following.picture}
                                                            alt=""
                                                            height={50}
                                                            width={50}
                                                            className="object-cover h-12 w-12"
                                                        /> :
                                                        <div className="flex items-center justify-center w-12 h-12 uppercase bg-red-400 text-white font-medium">
                                                            {fol?.following?.username?.split('')[0]}
                                                        </div>
                                                    }
                                                </div>
                                                <div className="">
                                                    <span className="text-xs font-medium block">{fol?.following?.username}</span>
                                                    <span className="text-xs font-medium text-black/50 block">{fol?.following?.name}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => {
                                                deleteFollower(fol.id as string)
                                            }} className="text-xs font-medium px-5 py-2 rounded-lg bg-black/10 flex justify-center">
                                                {deleLoading == fol.id ? <LuLoader2 className='animate-spin w-4 h-4' /> : "Remove"}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Followers
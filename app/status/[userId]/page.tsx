'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Slider from '../component/Slider'
import { IoMdClose } from 'react-icons/io';
import { InstagramIcon } from '@/app/components/icons';
import Link from 'next/link';
import axios from 'axios';
import { useParams } from 'next/navigation';

const Status = () => {
    const [data, setData] = useState({})
    const { userId } = useParams()
    const fetchStatuses = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/status/user?userId=${userId}`,);
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }, [userId])
    useEffect(() => {
        fetchStatuses()
    }, [fetchStatuses])

    return (
        <div className="h-svh w-svh bg-black/85 relative">
            <nav className='px-5 flex justify-between items-center absolute w-full'>
                <Link href={'/'}>
                    <InstagramIcon className='w-28 h-16 fill-white' />
                </Link>
                <Link href='/'>
                    <IoMdClose size={25} fill="white" />
                </Link>
            </nav>
            <div className="flex justify-center h-full items-center">
                <Slider data={data} />
            </div>
        </div>
    )
}

export default Status
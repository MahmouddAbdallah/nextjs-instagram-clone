import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { cookies } from 'next/headers';
import React from 'react'
import Slider from '../component/Slider'
import { IoMdClose } from 'react-icons/io';
import { InstagramIcon } from '@/app/components/icons';
import Link from 'next/link';

const page = async ({ params }: { params: Params }) => {
    const { userId } = params
    const token = cookies().get('token_auth')?.value;
    const res = await fetch(`http://localhost:3000/api/status/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error(await res.text());
    }
    const data = await res.json();

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

export default page
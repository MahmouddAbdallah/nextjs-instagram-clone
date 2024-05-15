import React from 'react'
import Image from 'next/image'
import img from '../public/loading.png'
const Loading = () => {
    return (
        <div className='flex items-center justify-center h-svh w-svw'>
            <Image
                src={img}
                height={80}
                width={80}
                alt='loading'
                priority
            />
        </div>
    )
}

export default Loading
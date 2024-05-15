import React from 'react'
import useClickOutside from '../hooks/useClickOutside'
import Link from 'next/link'

const PostSettings = ({ setOpen, postId }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, postId: string }) => {
    const close = () => {
        setOpen(false)
        document.body.style.overflowY = 'auto'
    }
    const refElemet = useClickOutside(close)
    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black/20 z-50 flex justify-center items-center'>
            <div ref={refElemet} className='w-96 sm:w-[400px] md:w-[500px] bg-white rounded-2xl'>
                <ul className='w-full'>
                    <li className='w-full'>
                        <Link className='w-full block text-center text-sm py-3 border-b' href={`/post/${postId}`}>Go To Post</Link>
                    </li>
                    <li className='w-full'>
                        <button onClick={close} className='w-full block text-center text-sm py-3'>Cancel</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PostSettings
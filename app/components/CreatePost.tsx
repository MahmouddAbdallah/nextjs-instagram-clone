'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { IoMdClose } from "react-icons/io";
import useClickOutside from '../hooks/useClickOutside';

const CreatePost = () => {
    const [open, setOpen] = useState(false);

    const refElement = useClickOutside(() => setOpen(!open))
    return (
        <>
            <button className='absolute w-full h-full z-40' onClick={() => {
                setOpen(!open)
            }} />
            {
                open &&
                <div className='fixed h-full w-full left-0 top-0 bg-black/50  z-50'>
                    <div className='h-full relative'>
                        <button
                            onClick={() => {
                                setOpen(!open)
                            }}
                            className='absolute right-5 top-5'>
                            <IoMdClose size={27} className='text-gray-200' />
                        </button>
                        <div className='flex justify-center items-center h-full'>
                            <div ref={refElement} className='bg-white rounded-md w-96 sm:w-[400px] md:w-[450px] lg:w-[700px]'>
                                <div className='flex justify-center border-b bg-white/5 py-3'>
                                    <h6 className='text-xs font-semibold'>Create new post</h6>
                                </div>
                                <div className='py-3 h-80 sm:h-96 lg:h-[500px] flex justify-center items-center'>
                                    <button className='text-[10px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-md'>
                                        Select from computer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreatePost
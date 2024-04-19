'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaCamera } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import user, { setUserData } from '@/redux/features/user';
import axios from 'axios';

const UploadImg = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState({} as File)
    const [image, setImage] = useState("")
    const btnRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user)

    const removeImage = () => {
        setOpen(!open)
        setImage('');
        setLoading(false)
        setImageFile({} as File);
        URL.revokeObjectURL(image)
    }

    const handleInputClick = (e: MouseEvent) => {
        e.preventDefault();
        const input = inputRef.current
        input?.click();
    }

    useEffect(() => {
        const btn = btnRef.current;
        btn?.addEventListener('click', handleInputClick)
        return () => btn?.removeEventListener('click', handleInputClick)
    }, []);

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e?.target?.files
        if (files) {
            const file = files[0];
            const url = URL.createObjectURL(file)
            setImage(url as string)
            setImageFile(file)
        }
    }

    const handleUploadImage = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('picture', imageFile)
            const res = await fetch('http://localhost:3000/api/user/photo', {
                method: 'PUT',
                body: formData,
                cache: 'reload'
            })
            if (!res.ok) throw new Error("Could not upload image");
            const data = await res.json();
            dispatch(setUserData({ picture: data.picture }))
            removeImage()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className='w-full h-full flex justify-center items-center group hover:bg-black/10 rounded-full'>
                <FaCamera size={25} className='invisible group-hover:visible fill-black/70' />
            </button>
            <div className={`fixed h-full w-full top-0 left-0 bg-black/20 flex justify-center items-center ${open ? 'flex' : 'hidden'}`}>
                <div onClick={() => {
                    if (loading)
                        return
                    else removeImage()
                }} className='absolute w-full h-full top-0 left-0' />
                {
                    image ?
                        <div className='z-50 bg-white py-5 rounded-md flex flex-col items-center gap-5'>
                            <div className='border-b px-20 pb-3'>
                                <span>
                                    Your Image Profile
                                </span>
                            </div>
                            <div className=' space-y-4'>
                                <div className='w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 '>
                                    <Image
                                        className='w-full h-full rounded-full object-cover'
                                        src={image}
                                        alt="Picture of the author"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <button
                                    className={clsx(
                                        'bg-blue-500 px-2 py-2 text-white w-full rounded-md text-xs flex justify-center',
                                        {
                                            'bg-blue-300 cursor-not-allowed': loading,
                                        }
                                    )}
                                    disabled={loading}
                                    onClick={handleUploadImage}
                                >
                                    {
                                        loading ?
                                            <AiOutlineLoading3Quarters size={20} className='fill-white animate-spin' />
                                            :
                                            "Share"
                                    }
                                </button>
                            </div>
                        </div>
                        : <div className='bg-white z-50 rounded-md'>
                            <div className='px-10 py-5'>
                                <span className='text-lg'>
                                    Change Profile Photo
                                </span>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    onChange={handleOnChangeInput}
                                    className='hidden'
                                    ref={inputRef}
                                />
                                <button ref={btnRef} className='text-xs w-full py-3 border-t text-blue-500 font-semibold'>
                                    Upload photo
                                </button>
                                {
                                    user.picture && <button className='text-xs w-full py-3 border-t text-red-500 font-semibold'>
                                        Remove Current Photo
                                    </button>
                                }
                                <button onClick={() => { removeImage() }} className='text-xs w-full py-3 border-t'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default UploadImg
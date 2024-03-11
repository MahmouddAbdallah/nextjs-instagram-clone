'use client';
import { useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import useClickOutside from '../hooks/useClickOutside';
import InputImage from './InputImage';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [warn, setWarn] = useState(false);
    const [image, setImage] = useState('' as string);
    const [imageFile, setImageFile] = useState({} as object);
    const titleRef = useRef<HTMLTextAreaElement | null>(null)

    const removeImage = () => {
        setOpen(!open)
        setImage('');
        setImageFile({});
        URL.revokeObjectURL(image)
    }

    const refElement = useClickOutside(() => {
        if (image) {
            setWarn(true)
        } else {
            removeImage()
        }
    })


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', imageFile as File);
        if (titleRef.current) {
            formData.append('title', titleRef.current.value);
        }
        const res = await fetch(`http://localhost:3000/api/post`, {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error("Could not create post");

        const data = await res.json();
        console.log(data);
        removeImage();
    }
    return (
        <>
            <button className='absolute w-full h-full z-40' onClick={() => {
                setOpen(!open)
                setWarn(false)
            }} />
            {open &&
                <div className={'fixed h-full w-full left-0 top-0 bg-black/50  z-50'}>
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
                                <form onSubmit={onSubmit}>
                                    <InputImage image={image} setImage={setImage} setImageFile={setImageFile} />
                                    <div>
                                        {
                                            image &&
                                            <div className='p-2'>
                                                <textarea
                                                    placeholder='Write a caption...'
                                                    ref={titleRef}
                                                    className='resize-none h-20 w-full border-2 outline-none rounded-md px-2 py-1 placeholder:text-sm text-sm' />
                                                <button className="w-full bg-blue-500 py-1 text-sm font-semibold text-white rounded-md">
                                                    Share
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {warn && <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center z-[999] bg-black/45'>
                        <div className='bg-white rounded-lg'>
                            <div className='text-center pt-5 px-10 md:px-14 lg:px-20'>
                                <p className='font-semibold'>Discard post?</p>
                                <span className='text-xs text-black/80'>If you leave, your edits won&#39;t be saved.</span>
                            </div>
                            <div className='mt-2'>
                                <button onClick={() => {
                                    removeImage()
                                }} className='text-sm border-t text-red-500 font-semibold w-full py-3'>
                                    Discard
                                </button>
                                <button onClick={() => setWarn(false)} className='text-sm border-t w-full py-3'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            }
        </>
    )
}

export default CreatePost
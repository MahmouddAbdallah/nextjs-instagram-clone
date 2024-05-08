'use client';
import { useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import useClickOutside from '../hooks/useClickOutside';
import InputImage from './InputImage';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import clsx from 'clsx';
import { useAppDispatch } from '../hooks/reduxHooks'
import { addPost } from "../../redux/features/posts"
import Image from 'next/image'
import axios from 'axios';
import { usePathname } from 'next/navigation';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [warn, setWarn] = useState(false);
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('' as string);
    const [imageFile, setImageFile] = useState({} as object);
    const pathname = usePathname();
    const titleRef = useRef<HTMLTextAreaElement | null>(null)
    const dispatch = useAppDispatch();


    const removeImage = () => {
        setOpen(!open)
        setImage('');
        setImageFile({});
        document.body.style.overflowY = 'auto'
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
        try {
            e.preventDefault();
            setOpen(!open)
            setLoading(true)
            document.body.style.overflowY = 'auto'
            const formData = new FormData();
            formData.append('image', imageFile as File);
            if (titleRef.current) {
                formData.append('title', titleRef.current.value);
            }
            const { data } = await axios.post(`/api/post`, formData);
            dispatch(addPost(data.post))
            setLoading(false)
            removeImage();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button
                onClick={() => {
                    setOpen(!open)
                    document.body.style.overflowY = 'hidden'
                    setWarn(false)
                }}
                className={clsx(
                    'flex items-center gap-3 py-2 sm:py-3 hover:bg-black/5 px-3  rounded-lg',
                    { "xl:pl-3 xl:w-56": !(pathname.startsWith('/messages')) }
                )}
            >
                <div className='flex items-center gap-3'>
                    <div>
                        <MdAddCircleOutline size={24} />
                    </div>
                    <span className={clsx(
                        'text-sm text-black/80 ',
                        { "hidden": pathname.startsWith('/messages') },
                        { "hidden xl:block": !(pathname.startsWith('/messages')) }
                    )}>
                        Create
                    </span>
                </div>
            </button>

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
            {loading &&
                <div className='fixed bg-green-500 bottom-14 right-1 px-1 py-2 rounded flex gap-2'>
                    <div className='px-1 relative flex justify-center items-center '>
                        <Image
                            className='w-10 h-10 rounded '
                            src={image}
                            alt=""
                            height={50}
                            width={50}
                        />
                        <div className='absolute h-full w-full flex justify-center items-center'>
                            <AiOutlineLoading3Quarters size={20} className='fill-white animate-spin' />
                        </div>
                    </div>
                    <span className='text-sm text-white font-semibold'>Uploaded Image <br /> Preview</span>
                </div>
            }
        </div>
    )
}

export default CreatePost
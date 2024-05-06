'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import Image from 'next/image';
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { LuLoader2 } from "react-icons/lu";

const CreateStatus = () => {

    const user = useAppSelector(state => state.user)
    const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState<File>()
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

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
            setImageFile(file as File)
            const image = URL.createObjectURL(file);
            setImage(image as string)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            const formData = new FormData();
            formData.append('image', imageFile as File)
            formData.append('text', text)
            await axios.post('/api/status', formData)
            setLoading(false)
            router.push('/')
        } catch (error: any) {
            toast.error(error?.response?.data?.text || 'There is an Error')
            setLoading(false)
            console.error(error);
        }
    }

    return (
        <div className='relative h-[75vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] w-[60vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] bg-black/50 rounded-xl'>
            <div className="h-full w-full flex items-center justify-center">
                <form onSubmit={onSubmit} className="w-full h-full relative">
                    <div className='p-3 absolute w-full'>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                                    {user.picture ? <Image
                                        height={200}
                                        width={200}
                                        className="object-cover w-full "
                                        src={user.picture as string}
                                        alt=""
                                    />
                                        :
                                        <div className="w-full h-full bg-red-400 uppercase flex items-center justify-center font-medium text-white">
                                            {user?.username?.split("")[0]}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <span className="text-white text-xs font-medium">{user?.username}</span>
                                </div>
                            </div>
                            {image &&
                                <button type='submit' className="text-blue-500 font-medium text-xs bg-white p-1 rounded-md">
                                    {loading ? <LuLoader2 className='animate-spin w-3 h-3' /> : "send"}
                                </button>
                            }
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <div className='h-full w-full flex justify-center items-center'>
                            {
                                image ?
                                    <div className="w-full h-full">
                                        {image.startsWith('blob') ?
                                            <Image
                                                src={image}
                                                alt=''
                                                className='h-full w-full object-cover rounded-xl'
                                                height={200}
                                                width={200}
                                            />
                                            :
                                            <video
                                                muted
                                                className='h-full w-full '
                                                autoPlay
                                                loop>
                                                <source src={image} />
                                            </video>
                                        }
                                    </div>
                                    :
                                    <div>
                                        <input type="file" onChange={handleOnChangeInput} className='hidden' ref={inputRef} />
                                        <button ref={btnRef} className='bg-white p-5 rounded-full mb-3'>
                                            <FaPlus size={25} />
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='flex gap-2 absolute bottom-0 px-2 pb-3 w-full'>
                        {image && <input
                            type="text"
                            value={text}
                            onChange={(e) => { setText(e.target.value as string) }}
                            placeholder="Write something"
                            className=" w-full bg-transparent border-2 border-white rounded-full px-2 py-3 outline-none text-white placeholder:text-white"
                        />}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateStatus
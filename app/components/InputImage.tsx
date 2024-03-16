'use client'
import Image from 'next/image';
import React, { SetStateAction, useEffect, useRef, useState } from 'react'

interface inputImageProps {
    setImageFile: React.Dispatch<SetStateAction<File>>;
    image: string,
    setImage: React.Dispatch<SetStateAction<string>>
}
const InputImage: React.FC<inputImageProps> = ({ setImageFile, image, setImage }) => {

    const btnRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            setImageFile(file)
            const image = URL.createObjectURL(file);
            setImage(image)
        }
    }

    console.log(image);

    return (
        <div>
            <div className='py-3 h-80 sm:h-96 lg:h-[500px] flex justify-center items-center'>
                {
                    image ?
                        <div >
                            {image.startsWith('blob') ?
                                <Image
                                    src={image}
                                    alt=''
                                    className='w-full  h-80 sm:h-96 lg:h-[500px] object-contain '
                                    height={200}
                                    width={200}
                                />
                                :
                                <video
                                    muted
                                    className='w-full  h-80 sm:h-96 lg:h-[500px] '
                                    autoPlay
                                    loop>
                                    <source src={image} />
                                </video>
                            }
                        </div>
                        :
                        <div>
                            <input type="file" onChange={handleOnChangeInput} className='hidden' ref={inputRef} />
                            <button ref={btnRef} className='text-[10px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-md'>
                                Select from computer
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default InputImage
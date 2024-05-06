'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import clsx from 'clsx';
import { useRouter } from 'next/navigation'
const Slider = ({ data }: { data: any }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter()
    const nextSlide = useCallback(
        (len: number) => {
            setCurrentSlide(currentSlide + 1)
            if (currentSlide === len - 1) {
                router.back()
            }
        },
        [currentSlide, router],
    )

    useEffect(() => {
        let interval = setInterval(() => nextSlide(data?.statuses?.length), 10000);
        return () => clearInterval(interval)
    }, [data?.statuses, nextSlide])
    return (
        <div className="flex justify-center items-center h-full">
            <button
                disabled={currentSlide == 0}
                onClick={() => { setCurrentSlide(currentSlide - 1) }}
                className=" p-2 rounded-full bg-white disabled:bg-white/50 mr-3">
                <FaArrowLeft size={18} />
            </button>
            <div className='relative h-[100vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] w-[100vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] bg-black/50 rounded-xl'>
                <div className="absolute px-4 py-8">
                    <Link href={`/profile/${data?.user?.id}`} className="flex gap-2 items-center">
                        <div className="w-7 h-7 bg-slate-200 rounded-full overflow-hidden">
                            {data?.user?.picture ? <Image
                                height={500}
                                width={500}
                                className="object-cover w-full "
                                src={data?.user?.picture as string}
                                alt=""
                            />
                                :
                                <div className="w-full h-full bg-red-400 uppercase flex items-center justify-center text-sm font-medium text-white">
                                    {data?.user?.username?.split("")[0]}
                                </div>
                            }
                        </div>
                        <div>
                            <span className="text-white text-xs font-medium">{data?.user?.username}</span>
                        </div>
                    </Link>
                </div>
                <div className="absolute w-full top-0 z-10 py-4 px-3 flex gap-1">
                    {data?.statuses.map((_: any, i: any) =>
                        <div key={i} className={clsx(
                            "h-1 w-full  rounded-md  relative overflow-hidden",
                            { "bg-white/70": i > currentSlide },
                            { "bg-white/70 active-status": i == currentSlide },
                            { "bg-white": i < currentSlide },
                        )} />
                    )}
                </div>
                <div className='h-full w-full flex justify-center items-center'>
                    {data?.statuses.map((item: any, i: number) =>
                        i == currentSlide &&
                        <div key={item.id} className="w-full h-full">
                            <Image
                                src={item.Image_status}
                                alt=''
                                className='h-full w-full object-cover rounded-xl'
                                height={200}
                                width={200}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={() => { nextSlide(data?.statuses?.length) }}
                className=" p-2 rounded-full bg-white ml-3">
                <FaArrowRight size={18} />
            </button>
        </div>
    )
}

export default Slider
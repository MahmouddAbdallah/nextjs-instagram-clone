import React from 'react'
import { InstagramIcon } from '../components/icons'
import FormData from './components/FormData'
import Link from 'next/link'
import Image from 'next/image'
import ImageSlider from './components/ImageSlider'
const SignIn = () => {

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='hidden md:block'>
                <div className='relative'>
                    <div>
                        <Image
                            height={300}
                            width={300}
                            className='w-96'
                            src={'/images/sign-in-page-img-cover.png'}
                            alt=''
                        />
                    </div>
                    <div className='absolute top-5 right-12'>
                        <ImageSlider />
                    </div>
                </div>
            </div>
            <div className='space-y-5'>
                <div className='w-80 py-14 px-5 border'>
                    <div className='space-y-2'>
                        <div className='flex justify-center'>
                            <InstagramIcon className='fill-black/80 w-40 h-fit' />
                        </div>
                    </div>
                    <div className='pt-5 px-5'>
                        <FormData />
                    </div>
                </div>
                <div className='w-80 py-3 px-5 border text-center'>
                    <span className="text-xs">
                        Don&#39;t have an account?
                        <span className="font-semibold text-blue-500">
                            <Link href={'/sign-up'}>
                                Sign up
                            </Link>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignIn
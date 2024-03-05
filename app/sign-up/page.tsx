import React from 'react'
import { InstagramIcon } from '../components/icons'
import FormData from './components/FormData'
import Link from 'next/link'

const SignUp = () => {

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='space-y-5'>
                <div className='w-80 py-14 px-5 border'>
                    <div className='space-y-2'>
                        <div className='flex justify-center'>
                            <InstagramIcon className='fill-black/85 w-40 h-fit' />
                        </div>
                        <div className='text-center px-5'>
                            <span className='font-semibold text-black/60 text-sm'>
                                Sign up to see photos and videos from your friends.
                            </span>
                        </div>
                    </div>
                    <div className='pt-5 px-5'>
                        <FormData />
                    </div>
                </div>
                <div className='w-80 py-3 px-5 border text-center'>
                    <span className="text-xs">
                        Have an account?
                        <span className="font-semibold text-blue-500">
                            <Link href={'/sign-in'}>
                                Sign in
                            </Link>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignUp
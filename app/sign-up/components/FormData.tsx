'use client';
import ErrorMsg from '@/app/components/ErrorMsg';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LuLoader2 } from "react-icons/lu";

type dataForm = {
    email: string,
    name: string,
    username: string,
    password: string
}

const FormData = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<dataForm>();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const onSubmit = handleSubmit(async (formData) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/auth/sign-up`, {
                method: "POST",
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log(data);
            window.location.reload();
            setLoading(false);
            router.push('/')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'There is an Error')
            setLoading(false)
            console.error({ error });
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <div className='space-y-3'>
                <div>
                    <input
                        className={clsx(
                            'w-full border rounded bg-gray-50 px-1 py-2 outline-none text-xs focus:border-black/30 placeholder:text-xs',
                            {
                                'border-red-500 focus:border-red-500': !!errors.email?.message
                            }
                        )}
                        placeholder='Email'
                        type="email"
                        {...register('email', { required: 'Email is required.' })}
                    />
                    <ErrorMsg message={errors.email?.message as string} />
                </div>
                <div>
                    <input
                        type="text"
                        className={clsx(
                            'w-full border rounded bg-gray-50 px-1 py-2 outline-none text-xs focus:border-black/30 placeholder:text-xs',
                            {
                                'border-red-500 focus:border-red-500': !!errors.name?.message
                            }
                        )}
                        placeholder='Full Name'
                        {...register('name', { required: 'Name is required.' })}
                    />
                    <ErrorMsg message={errors.name?.message as string} />
                </div>
                <div>
                    <input
                        type="text"
                        className={clsx(
                            'w-full border rounded bg-gray-50 px-1 py-2 outline-none text-xs focus:border-black/30 placeholder:text-xs',
                            {
                                'border-red-500 focus:border-red-500': !!errors.name?.message
                            }
                        )}
                        placeholder='Username'
                        {...register('username', { required: 'Username is required.' })}
                    />
                    <ErrorMsg message={errors.username?.message as string} />
                </div>
                <div>
                    <input
                        type="password"
                        className={clsx(
                            'w-full border rounded bg-gray-50 px-1 py-2 outline-none text-xs focus:border-black/30 placeholder:text-xs',
                            {
                                'border-red-500 focus:border-red-500': !!errors.password?.message
                            }
                        )}
                        placeholder='Password'
                        {...register('password', { required: 'Password is required.', })}
                    />
                    <ErrorMsg message={errors.password?.message as string} />
                </div>
            </div>
            <div className='pt-5'>
                <div className='text-center space-y-7'>
                    <p className='text-[10px]'>
                        People who use our service may have uploaded your contact information to Instagram.
                    </p>
                    <p className='text-[10px]'>
                        By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                    </p>
                </div>
                <button disabled={!isValid} className='bg-blue-600 disabled:bg-blue-400 w-full text-xs py-2 rounded mt-5 text-white font-semibold'>
                    {loading ? <LuLoader2 className='animate-spin w-3 h-3' /> : "Sign up"}
                </button>
            </div>
        </form>
    )
}

export default FormData
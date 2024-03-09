'use client';
import ErrorMsg from '@/app/components/ErrorMsg';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
type dataForm = {
    email: string,
    name: string,
    username: string,
    password: string
}
const FormData = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<dataForm>();
    const router = useRouter();
    const onSubmit = handleSubmit(async (formData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/auth/sign-in`, {
                method: "POST",
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            console.log(data);
            router.push('/')
        } catch (error) {
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
                <button disabled={!isValid} className='bg-blue-600 disabled:bg-blue-400 w-full text-xs py-2 rounded mt-5 text-white font-semibold'>
                    Log in
                </button>
            </div>
        </form>
    )
}

export default FormData
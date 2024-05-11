'use client'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { socket } from '../../components/socket';
import { useRouter } from 'next/navigation';
import { useContextMsgApp } from '../contxt-msg/ContextMsg';

const TypingMsg = () => {
    const { register, handleSubmit, formState: { isValid }, reset } = useForm();
    const context = useContextMsgApp();
    const router = useRouter()

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data }: { data: any } = await axios.post('api/messages/message', {
                chatId: context?.chatId,
                receiverId: context?.userId,
                content: formData.message
            })
            if (data.chat) {
                router.push(`/messages?userId=${context?.userId}&chatId=${data.chat.id}`)
            }
            socket.emit("message", { data: data.message, room: context?.chatId });
            reset()
        } catch (error) {
            console.error(error);
        }
    })

    return (
        <form className='w-full py-5 px-10 border-t' onSubmit={onSubmit}>
            <div className='relative flex items-center'>
                <input
                    type="text"
                    placeholder='Message...'
                    className='border w-full py-2 px-2 outline-none rounded-full'
                    {...register('message', { required: true })}
                />
                {isValid &&
                    <button
                        className='text-blue-500 disabled:text-blue-300 font-medium absolute right-5'
                        type='submit'
                        disabled={!isValid}
                    >
                        Send
                    </button>}
            </div>
        </form>
    )
}

export default TypingMsg
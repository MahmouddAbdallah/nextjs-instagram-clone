'use client'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { socket } from '../../components/socket';
import { useRouter } from 'next/navigation';
import { useContextMsgApp } from '../contxt-msg/ContextMsg';

const TypingMsg = ({ userId, chatId }: { userId: string, chatId: string }) => {
    const { register, handleSubmit, formState: { isValid }, reset } = useForm();
    const context = useContextMsgApp();
    const router = useRouter()

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data }: { data: any } = await axios.post('api/messages/message', {
                chatId: chatId,
                receiverId: userId,
                content: formData.message
            })
            if (data.chat) {
                context?.setChats(prev => [data.chat, ...prev] as any)

                router.push(`/messages?userId=${userId}&chatId=${data.chat.id}`)
            }
            socket.emit("message", { data: data.message, room: chatId });
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
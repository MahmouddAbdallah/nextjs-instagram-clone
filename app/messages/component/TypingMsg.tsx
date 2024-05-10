'use client'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { socket } from '../../components/socket';
import { useRouter } from 'next/navigation';
import { useContextMsgApp } from '../contxt-msg/ContextMsg';
// import { useContextMsgApp } from '../contxt-msg/ContextMsg';

const TypingMsg = ({ userId, chatId }: { chatId: string, userId: string }) => {
    const { register, handleSubmit, formState: { isValid }, reset } = useForm();
    const router = useRouter()

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data }: { data: any } = await axios.post('api/messages/message', {
                chatId,
                receiverId: userId,
                content: formData.message
            })
            if (data.chat) {
                router.push(`/messages?userId=${userId}&chatId=${data.chat.id}`)
            }
            socket.emit("message", { data: data.message, room: chatId });
            reset()
        } catch (error) {
            console.error(error);
        }
    })

    return (
        <form className='w-full' onSubmit={onSubmit}>
            <input
                type="text"
                placeholder='write something...'
                className='border w-full py-2 px-2 outline-none'
                {...register('message', { required: true })}
            />
        </form>
    )
}

export default TypingMsg
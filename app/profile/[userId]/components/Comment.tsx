/* eslint-disable @next/next/no-img-element */
import { commentType } from '@/app/types/user'
import clsx from 'clsx';
import React, { useState } from 'react';
import { IoIosHeart } from "react-icons/io";

interface commentProps {
    comments: commentType[]
    like: string[],
    setLike: React.Dispatch<React.SetStateAction<string[]>>
}

const Comment: React.FC<commentProps> = ({ comments, like, setLike }) => {

    const addLike = async (commentId: string) => {
        try {
            const res = await fetch('http://localhost:3000/api/comment/like', {
                method: "PUT",
                body: JSON.stringify({ commentId }),
            })
            if (!res.ok) throw new Error('Could not like to comment');
            const data = await res.json();
            setLike((prev) => {
                if (prev.includes(data.commentId)) {
                    return prev.filter(item => item != data.commentId)
                } else {
                    return [...prev, data.commentId]
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const findLike = (commentId: string) => {
        return like.includes(commentId)
    }

    return (
        <React.Fragment>
            {
                comments?.length == 0 ?
                    <div className='flex justify-center items-center sm:h-full py-3'>
                        <span className='text-black font-bold'>No comments yet.</span>
                    </div>
                    :
                    <div className='space-y-3 px-3'>
                        {
                            comments.map(comment => {

                                return (
                                    <div key={comment.id}>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-3'>
                                                <div>
                                                    {
                                                        comment.user.picture ?
                                                            <img
                                                                src={comment.user.picture}
                                                                className='w-8 h-8 rounded-full object-cover'
                                                                alt=""
                                                            /> :
                                                            <div className='w-8 h-8 flex justify-center items-center bg-red-400 rounded-full font-semibold text-white'>
                                                                {comment?.user?.username?.split('')[0]}
                                                            </div>
                                                    }
                                                </div>
                                                <div className='space-x-2'>
                                                    <span className='text-xs font-[500]'>
                                                        {comment.user.username}
                                                    </span>
                                                    <span className='text-xs text-black/80'>
                                                        {comment.text}
                                                    </span>
                                                </div>
                                            </div>
                                            <button onClick={() => {
                                                addLike(comment.id)
                                            }} >
                                                <IoIosHeart size={12} className={clsx(
                                                    'fill-none stroke-[30px] ',
                                                    { 'fill-red-500 stroke-red-500': comment?.CommentLike?.length > 0 },
                                                    { 'fill-red-500 stroke-red-500': findLike(comment.id as string) }
                                                )} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </React.Fragment>
    )
}

export default Comment
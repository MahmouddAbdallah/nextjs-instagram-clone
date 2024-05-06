/* eslint-disable @next/next/no-img-element */
import { commentType } from '@/app/types/user'
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import React from 'react';
import { IoIosHeart } from "react-icons/io";
import { addCommentLike } from '@/redux/features/post'
import axios from 'axios';



const Comment = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user)
    const comments = useAppSelector((state) => state.post.comments)

    const addLike = async (commentId: string) => {
        try {
            const { data } = await axios.put(`/api/comment/like/`, { commentId })
            dispatch(addCommentLike({ userId: data.userId, commentId: data.commentId }))
        } catch (error) {
            console.error(error);
        }
    }

    const isLiked = (commentId: string) => {
        return comments.some(item => {
            if (item.id == commentId) {
                const li = item?.CommentLike?.some(
                    like => {
                        if (like.userId == user.id) {
                            return true
                        } else {
                            return false
                        }
                    }
                )
                return li
            }
        })
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
                                        <div className='grid grid-cols-12 items-start overflow-x-hidden'>
                                            <div className='col-span-11 flex gap-3'>
                                                <div>
                                                    {
                                                        comment.user.picture ?
                                                            <div className='min-w-8'>
                                                                <img
                                                                    src={comment.user.picture}
                                                                    className='w-8 h-8 rounded-full object-cover'
                                                                    alt=""
                                                                />
                                                            </div> :
                                                            <div className='w-8 h-8 flex justify-center items-center bg-red-400 rounded-full font-semibold text-white'>
                                                                {comment?.user?.username?.split('')[0]}
                                                            </div>
                                                    }
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-xs  font-[500]'>
                                                        {comment.user.username}
                                                    </span>
                                                    <span className='text-xs block text-black/80 break-words'>
                                                        {comment.text}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                className='col-span-1'
                                                onClick={() => {
                                                    addLike(comment.id)
                                                }} >
                                                <IoIosHeart size={12} className={clsx(
                                                    'fill-none stroke-[30px] ',
                                                    { "fill-red-500 stroke-red-500": isLiked(comment.id as string) }
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
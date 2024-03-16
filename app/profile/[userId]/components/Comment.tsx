/* eslint-disable @next/next/no-img-element */
import { commentType } from '@/app/types/user'
import React from 'react';
import { CiHeart } from "react-icons/ci";

interface commentProps {
    comments: commentType[]
}
const Comment: React.FC<commentProps> = ({ comments }) => {
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
                            comments.map(comment =>
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
                                        <button>
                                            <CiHeart />
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </React.Fragment>
    )
}

export default Comment
/* eslint-disable @next/next/no-img-element */
'use client'
import useClickOutside from '@/app/hooks/useClickOutside'
import { commentType, postType } from '@/app/types/user'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react';
import Comment from './Comment';
import CommentUserHeader from './CommentUserHeader';

const ViewPost = (
    {
        post,
        setOpen
    }: {
        post: postType,
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const refElement = useClickOutside(() => setOpen(false))
    const { register, setValue, formState: { isValid }, handleSubmit } = useForm<commentType>();

    const [comments, setComments] = useState<commentType[]>([])
    const [like, setLike] = useState<string[]>([])

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/comment', {
                method: 'POST',
                body: JSON.stringify({
                    text: data.text,
                    postId: post.id
                }),
            })
            if (!res.ok) throw new Error('something went wrong')
            const comment = await res.json();
            setComments([...comments, comment.comment])
            setValue('text', "")
        } catch (error) {
            console.error(error);
        }
    })

    const fetchComment = useCallback(
        async () => {
            const res = await fetch(`http://localhost:3000/api/comment/${post.id}`, {
                method: 'GET',
            })
            if (!res.ok) throw new Error('something went wrong')
            const comments = await res.json();
            console.log({ comments });
            setComments(comments?.comments)
        }
        , [post.id])
    useEffect(() => {
        fetchComment()
    }, [fetchComment])

    return (
        <div className='fixed left-0 top-0 w-full h-full bg-black/30 z-50 flex justify-center items-center'>
            <div ref={refElement} className='w-10/12 md:w-[700px] sm:h-96 md:h-[400px] lg:w-[900px] lg:h-[600px] xl:w-[1000px] bg-white rounded grid grid-cols-12 overflow-hidden'>
                <CommentUserHeader
                    className='flex sm:hidden'
                    picture={post?.user?.picture as string}
                    username={post?.user?.username as string}
                />
                <div className='flex justify-center items-center col-span-12 sm:col-span-6 py-5 bg-black'>
                    <Image
                        height={500}
                        width={500}
                        className="object-contain"
                        src={post.image}
                        alt=""
                    />
                </div>
                <div className='col-span-12 sm:col-span-6 bg-white flex flex-col justify-between'>
                    <CommentUserHeader
                        className='hidden sm:flex'
                        picture={post?.user?.picture as string}
                        username={post?.user?.username as string}
                    />
                    <div className='flex-1 py-3 overflow-auto'>
                        <Comment comments={comments} setLike={setLike} like={like} />
                    </div>
                    <form onSubmit={onSubmit} className='w-full flex border-t'>
                        <input
                            type="text"
                            {...register('text', { required: true })}
                            placeholder='Add a comment...'
                            className='outline-none w-full py-2 pl-2 my-1 text-xs'
                        />
                        <button
                            disabled={!isValid}
                            className='text-xs font-semibold text-blue-500 disabled:text-blue-300 px-2'>
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ViewPost
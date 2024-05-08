'use client'
import useClickOutside from '@/app/hooks/useClickOutside'
import { commentType } from '@/app/types/user'
import { useCallback, useEffect, useRef } from 'react';
import Comment from './Comment';
import PostUserHeader from './PostUserHeader';
import AddComment from '@/app/components/AddComment'
import AddPostLike from '@/app/components/AddPostLike'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { setComment } from '../../redux/features/post'
import Image from 'next/image';

const ViewPost = (
    {
        setOpen
    }: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const post = useAppSelector((state) => state.post)
    const dispatch = useAppDispatch()

    const fetchComment = useCallback(
        async () => {
            const res = await fetch(`/api/comment/${post.id}`, {
                method: 'GET',
            })
            if (!res.ok) throw new Error('something went wrong')
            const comments = await res.json();
            dispatch(setComment(comments.comments as commentType[]))
        }
        , [dispatch, post.id])

    useEffect(() => {
        fetchComment()
    }, [fetchComment])

    const refElement = useClickOutside(() => {
        setOpen(false)
        dispatch(setComment([]))
        document.body.style.overflow = 'auto'
    })

    return (
        <div className='fixed top-0 left-0 h-svh w-svw z-50 bg-black/30 flex items-center justify-center'>
            <div ref={refElement} className='grid grid-cols-12 bg-white max-w-[400px] sm:max-w-[550px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1100px] md:h-[500px] lg:h-[600px] xl:h-[650px] rounded-xl md:rounded-none overflow-hidden'>
                <div className="col-span-12 md:col-span-7 flex justify-center items-center">
                    <div className='w-full h-full bg-black flex flex-col md:flex-row items-center justify-center'>
                        <PostUserHeader
                            className='flex md:hidden bg-white w-full'
                            picture={post?.user?.picture as string}
                            username={post?.user?.username as string}
                        />
                        <div className=" bg-black w-full max-h-[400px] md:max-h-[650px]">
                            <Image
                                height={50}
                                width={50}
                                src={post.image}
                                className="w-full h-full object-cover "
                                alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-5 overflow-y-hidden">
                    <div className='flex flex-col justify-between h-full'>
                        <PostUserHeader
                            className='hidden md:flex'
                            picture={post?.user?.picture as string}
                            username={post?.user?.username as string}
                        />
                        <div className="flex-1 flex  max-h-32 md:max-h-[300px] lg:max-h-[430px] xl:max-h-[470px] ">
                            <div className=' py-3 overflow-y-auto w-full'>
                                <Comment />
                            </div>
                        </div>
                        <AddPostLike postId={post.id} />
                        <AddComment postId={post.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPost

//
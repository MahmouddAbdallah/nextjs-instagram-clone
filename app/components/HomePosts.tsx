'use client'
import axios from 'axios';
import { useEffect, useCallback, useRef, useState } from 'react';
import { IoIosHeart } from "react-icons/io";
import HomePost from './HomePost';
import { CommentIcon } from './icons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setPostsData, addPosts } from '../../redux/features/posts';
import { LuLoader2 } from 'react-icons/lu';

const HomePosts = () => {
    const posts = useAppSelector(state => state.posts.posts)
    const dispatch = useAppDispatch()
    const [skip, setSkip] = useState(0)
    const [initScroll, setInitScroll] = useState(1000)


    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY
            if (scrollTop >= initScroll) {
                setInitScroll(prev => prev + 1000)
                setSkip(skip + 3)
            }
        }
        // clean up code
        // window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [initScroll, skip]);



    const fetchPosts = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/post?skip=${skip}`)

            if (skip > 0) {
                data.posts.forEach((element: any) => {
                    dispatch(addPosts(element))
                });
            }
            else {
                dispatch(setPostsData(data))
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, skip]);

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const addLikes = async () => {
        const likes = localStorage.getItem('likes') as any
        const likesIds: [any] = JSON.parse(likes as string) || []
        if (likesIds?.length) {
            likesIds.forEach(async (element: any) => {
                try {
                    await axios.put('/api/post/like', {
                        postId: element
                    })
                    const index = likesIds.findIndex((item: any) => item == element)
                    likesIds.splice(index, 1)
                    localStorage.setItem('likes', JSON.stringify(likesIds))
                } catch (error) {
                    console.error(error);
                }
            })
        }

    }
    useEffect(() => {
        const intervalLikes = setInterval(addLikes, 10000)
        return () => { clearInterval(intervalLikes) }
    }, [])

    return (
        <div className='pb-10 sm:pt-5'>
            <div className="lg:pl-72 mx-auto lg:mx-0 max-w-[500px] lg:max-w-[750px]">
                <ul className='w-full space-y-10'>
                    {
                        posts.length ?
                            posts?.map((post: any) => {
                                return (
                                    <li key={post.id}>
                                        <HomePost post={post} />
                                    </li>
                                )
                            })
                            :
                            [1, 2, 3, 4, 5,].map(item =>
                                <li key={item}>
                                    <div className="mb-2 flex gap-2">
                                        <div className='w-8 h-8 rounded-full bg-slate-100 animate-pulse' />
                                        <div className='space-y-2'>
                                            <div className='w-32 h-3 rounded-full bg-slate-100 animate-pulse' />
                                            <div className='w-32 h-2 rounded-full bg-slate-100 animate-pulse' />
                                        </div>
                                    </div>
                                    <div className='h-96 bg-slate-100 animate-pulse' />
                                    <div className="mt-2 flex gap-3">
                                        <IoIosHeart className="w-7 h-7 fill-slate-100 animate-pulse" />
                                        <CommentIcon className="w-6 h-6 fill-slate-100 stroke-slate-100 animate-pulse" />
                                    </div>
                                    <div className='h-10 w-full p-2 bg-slate-100 animate-pulse mt-2' >
                                        <div className="bg-white h-2 rounded-full mb-2" />
                                        <div className="bg-white h-2 rounded-full" />
                                    </div>
                                </li>
                            )
                    }
                </ul>
                <div className='flex justify-center pt-10'>
                    <LuLoader2 className='animate-spin w-8 h-8' />
                </div>
            </div>
        </div>
    )

}

export default HomePosts
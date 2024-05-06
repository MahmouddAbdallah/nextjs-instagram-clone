'use client'
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { IoIosHeart } from "react-icons/io";
import HomePost from './HomePost';
import { CommentIcon } from './icons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setPostsData } from '@/redux/features/posts';

const HomePosts = () => {
    const posts = useAppSelector(state => state.posts.posts)

    const dispatch = useAppDispatch()

    const fetchPosts = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/post`)
            dispatch(setPostsData(data))
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])


    return (
        <div className='py-10'>
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
            </div>
        </div>
    )

}

export default HomePosts
'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostUserHeader from './PostUserHeader';
import Image from 'next/image'
import LikeToPostHome from './LikeToPostHome';
import { IoIosHeart } from "react-icons/io";
import HomePost from './HomePost';

const HomePosts = () => {
    const [posts, setPosts] = useState([])
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/post`)
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className='py-20'>
            <div className="lg:pl-72 max-w-[750px]">
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
                                    <div className="mt-2">
                                        <IoIosHeart className="w-7 h-7 fill-slate-100 animate-pulse" />
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
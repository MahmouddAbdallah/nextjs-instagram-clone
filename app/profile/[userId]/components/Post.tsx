'use client'
import { postType } from '@/app/types/user'
import Image from 'next/image'
import React, { useState } from 'react'
import ViewPost from './ViewPost'

const Post = ({ post }: { post: postType }) => {
    const [postView, setPostView] = useState<postType>({} as postType)
    const [open, setOpen] = useState(false);
    const viewPost = () => {
        setOpen(true)
        setPostView(post)
    }
    return (
        <div className="col-span-4 border relative group">
            <div className="h-44 sm:h-48 md:h-52 lg:h-64 bg-gray-50">
                <Image
                    height={500}
                    width={500}
                    className="h-44 sm:h-48 md:h-52 lg:h-64 object-cover"
                    src={post.image}
                    alt=""
                />
            </div>
            <button onClick={viewPost} className='bg-black/10 h-full w-full absolute left-0 top-0 hidden group-hover:block' />
            {open && < ViewPost post={postView} open={open} setOpen={setOpen} />}
        </div>
    )
}

export default Post
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { HeartIcon } from './icons'
import clsx from 'clsx'
interface propsInterface {
    img: string,
    postId: string,
    isLike: boolean,
    setIsLike: React.Dispatch<React.SetStateAction<boolean>>,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    count: number
}
const PostImg: React.FC<propsInterface> = ({ img, postId, isLike, setIsLike, setCount, count }) => {
    const [firstClick, setFirstClick] = useState(false);
    const [heart, setHeart] = useState(true);

    const setLike = (id: string) => {
        const likes = localStorage.getItem('likes') as any
        const likesIds: any = JSON.parse(likes as string) || []
        const index = likesIds.findIndex((item: any) => item == id)
        if (index == -1 && isLike == false) {
            likesIds.push(id)
            setIsLike(true)
            setCount(prev => prev + 1)
        } else {
            likesIds.splice(index, 1)
            setCount((prev) => prev - 1)
            setIsLike(false)
        }
        localStorage.setItem('likes', JSON.stringify(likesIds))
    }
    return (
        <button
            onClick={() => {
                if (!isLike && !heart) {
                    // addLike()
                    setLike(postId)
                }
                setHeart(!heart)
                setFirstClick(heart ? false : true)
            }}
            className="border relative flex items-center justify-center overflow-hidden cursor-default">
            <Image
                height={500}
                width={500}
                className="object-cover w-full "
                src={img}
                alt=""
            />
            <div className='absolute'>
                {firstClick && <HeartIcon className={clsx(
                    'h-36 w-36',
                    { 'block anim-heart-right': heart },
                )} />}
            </div>
        </button>
    )
}

export default PostImg
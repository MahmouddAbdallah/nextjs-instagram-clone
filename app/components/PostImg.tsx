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

    const addLike = async () => {
        try {
            if (!isLike) {
                await axios.put('/api/post/like', {
                    postId: postId
                })
                setCount(count + 1)
                setIsLike(true)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button
            onClick={() => {
                if (!isLike && !heart) {
                    addLike()
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
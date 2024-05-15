import { setLikes } from '@/redux/features/postLike';
import axios from 'axios';
import clsx from 'clsx'
import React from 'react'
import { IoIosHeart } from "react-icons/io";
interface propsInterface {
    isLike: boolean,
    setIsLike: React.Dispatch<React.SetStateAction<boolean>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>;
    postId: string

}
const LikeToPostHome: React.FC<propsInterface> = ({ isLike, setIsLike, count, setCount, postId }) => {

    const setLike = (id: string) => {
        const likes = localStorage.getItem('likes') as any
        let likesIds: any = JSON.parse(likes as string) || []
        const index = likesIds.findIndex((item: any) => item == id)
        if (index == -1) {
            likesIds.push(id)
            setIsLike(!isLike)
            setCount(prev => isLike ? prev - 1 : prev + 1)
        } else {
            likesIds.splice(index, 1)
            setIsLike(!isLike)
            setCount(prev => isLike ? prev - 1 : prev + 1)
        }
        localStorage.setItem('likes', JSON.stringify(likesIds))
    }
    return (
        <div>
            <button onClick={() => {
                setLike(postId)
            }}>
                <IoIosHeart className={clsx(
                    'fill-none stroke-[30px] w-7 h-7 active:scale-110 transition',
                    { "fill-red-500 stroke-red-500": isLike }
                )} />
            </button>
            <div>
                <span className='text-sm font-medium'>{count} {count == 1 ? "like" : "likes"}</span>
            </div>
        </div>
    )
}

export default LikeToPostHome
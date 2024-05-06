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

    const addLike = async () => {
        try {
            await axios.put('/api/post/like', {
                postId
            })
            setIsLike(!isLike)
            setCount(isLike ? count - 1 : count + 1)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <button onClick={addLike}>
                <IoIosHeart className={clsx(
                    'fill-none stroke-[30px] w-7 h-7',
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
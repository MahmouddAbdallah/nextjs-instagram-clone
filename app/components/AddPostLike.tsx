import axios from "axios";
import clsx from "clsx";
import { IoIosHeart } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useCallback, useEffect } from "react";
import { setLikes, addLikePost } from "@/redux/features/postLike";
import Link from 'next/link';
import Image from "next/image";

interface props {
    postId: string
}
const AddPostLike: React.FC<props> = ({ postId }) => {
    const post = useAppSelector((state) => state.post)
    const like = useAppSelector((state) => state.like)

    const dispatch = useAppDispatch()

    const addLike = async () => {
        try {
            await axios.put(`/api/post/like `, {
                postId
            })
            dispatch(addLikePost())
        } catch (error) {
            console.error(error);
        }
    }
    const getLikes = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`${process.env.BASE_URL}/api/post/like/${post.id}`);
                dispatch(setLikes(data))
            } catch (error) {
                console.error(error);
            }
        }
        , [dispatch, post.id])

    useEffect(() => {
        getLikes()
    }, [getLikes])

    return (
        <div className='py-2 px-2 border-t'>
            <button onClick={addLike}>
                <IoIosHeart className={clsx(
                    'fill-none stroke-[30px] w-7 h-7',
                    { "fill-red-500 stroke-red-500": like.isLike }
                )} />
            </button>
            <div className='flex gap-3'>
                {
                    like.count ?
                        <div>
                            <div className="flex ">
                                {like?.users?.map((user) => {
                                    return (
                                        <div key={user.user.id} className="first:ml-0 -ml-1">
                                            {user.user.picture ?
                                                <div>
                                                    <Image height={50} width={50} src={user.user.picture} className='w-5 h-5 object-cover rounded-full' alt="" />
                                                </div>
                                                : <div className='w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-xs text-white border'>
                                                    {user?.user?.username?.split('')[0]}
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <span className="text-xs">
                                Liked by
                                <Link className="font-medium" href={`/profile/${like?.users[0]?.user?.id}`}> {like?.users[0]?.user?.username} </Link>
                                and <button className="font-medium" >{like?.count} other</button>
                            </span>
                        </div> : ""
                }
            </div>
        </div>

    )
}

export default AddPostLike
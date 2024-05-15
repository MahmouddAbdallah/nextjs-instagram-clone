import Image from 'next/image'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from 'next/link';
import PostSettings from './PostSettings';
import { useState } from 'react';


interface props {
    picture: string,
    username: string,
    className?: string,
    userId?: string,
    postId?: string
}

const PostUserHeader: React.FC<props> = ({ picture, username, className, userId, postId }) => {
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div className='w-full'>
            <div className={`px-2 py-2 ${className} justify-between items-center border-b`}>
                <Link href={`/profile/${userId}`} className='flex items-center gap-2'>
                    {
                        picture ?
                            <Image
                                height={200}
                                width={200}
                                className="object-cover w-8 h-8 rounded-full"
                                src={picture as string}
                                alt=""
                            /> : <div className="w-8 h-8 rounded-full bg-red-400 uppercase flex items-center justify-center text-xs font-medium text-white">
                                {username?.split("")[0]}
                            </div>
                    }
                    <span className='text-sm font-semibold'>
                        {username}
                    </span>
                </Link>
                <button onClick={() => {
                    setOpenSettings(true);
                    document.body.style.overflowY = 'hidden'
                }}>
                    <HiOutlineDotsHorizontal size={18} />
                </button>
            </div>
            {openSettings &&
                <PostSettings
                    postId={postId || ""}
                    setOpen={setOpenSettings}
                />
            }
        </div>
    )
}

export default PostUserHeader
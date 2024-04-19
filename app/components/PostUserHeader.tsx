import Image from 'next/image'
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface props {
    picture: string,
    username: string,
    className: string
}

const PostUserHeader: React.FC<props> = ({ picture, username, className }) => {

    return (
        <div className={`px-2 py-2 ${className} justify-between items-center border-b`}>
            <div className='flex items-center gap-2'>
                {
                    picture ?
                        <Image
                            height={200}
                            width={200}
                            className="object-cover w-8 h-8 rounded-full"
                            src={picture as string}
                            alt=""
                        /> : "..."
                }
                <span className='text-sm font-semibold'>
                    {username}
                </span>
            </div>
            <button>
                <HiOutlineDotsHorizontal size={18} />
            </button>
        </div>
    )
}

export default PostUserHeader
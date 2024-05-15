import PostUserHeader from './PostUserHeader';
import LikeToPostHome from './LikeToPostHome';
import PostImg from './PostImg';
import { useState } from 'react';
import { CommentIcon } from './icons';
import { useAppDispatch } from '../hooks/reduxHooks'
import { setPostData } from '../../redux/features/post'
import { postType } from '../types/user';
import ViewPost from './ViewPost';
import AddCommentPost from './AddCommentPost';
import Link from 'next/link';

const HomePost = ({ post }: { post: any }) => {
    const [isLike, setIsLike] = useState(post.isLike);
    const [count, setCount] = useState(post.likesCount)
    const [openViewPost, setOpenViewPost] = useState(false);

    const dispatch = useAppDispatch();
    const viewPost = () => {
        setOpenViewPost(true)
        dispatch(setPostData(post as postType))
        document.body.style.overflow = 'hidden'
    }
    return (
        <div>
            <div>
                <div className='full'>
                    <div>
                        <PostUserHeader
                            picture={post.user.picture}
                            username={post.user.username}
                            userId={post.user.id}
                            postId={post.id}
                            className={'flex'}
                        />
                    </div>
                    <PostImg
                        img={post.image}
                        isLike={isLike}
                        postId={post.id}
                        setIsLike={setIsLike}
                        setCount={setCount}
                        count={count}
                    />
                    <div className='px-2 sm:px-0'>
                        <div>
                            <div className='flex items-start gap-3'>
                                <div className='pt-2'>
                                    <LikeToPostHome
                                        isLike={isLike}
                                        setIsLike={setIsLike}
                                        setCount={setCount}
                                        postId={post.id as string}
                                    />
                                </div>
                                <button
                                    onClick={viewPost}
                                    className='pt-2 -ml-1'>
                                    <CommentIcon className=' stroke-[2px] stroke-black' />
                                </button>
                            </div>
                            {count > 0 && <div className=''>
                                <span className='text-sm font-medium'>{count} {count == 1 ? "like" : "likes"}</span>
                            </div>}
                        </div>
                        <div className=''>
                            {post.title &&
                                <div className='pt-2'>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/profile/${post.user.id}`}
                                            className='text-sm font-semibold'
                                        >
                                            {post.user.username}
                                        </Link>
                                        <div>
                                            <span className='text-sm font-medium'>{post.title}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <AddCommentPost postId={post.id} />
                    </div>
                </div>
                {openViewPost && < ViewPost open={openViewPost} setOpen={setOpenViewPost} />}
            </div>
        </div>
    )
}

export default HomePost
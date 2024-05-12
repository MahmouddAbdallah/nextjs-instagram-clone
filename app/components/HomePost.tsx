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
            <div className='full'>
                <div>
                    <PostUserHeader
                        picture={post.user.picture}
                        username={post.user.username}
                        userId={post.user.id}
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
                <div className='flex items-start'>
                    <div className='px-2 pt-2'>
                        <LikeToPostHome
                            isLike={isLike}
                            setIsLike={setIsLike}
                            count={count}
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
                <AddCommentPost postId={post.id} />
            </div>
            {openViewPost && < ViewPost open={openViewPost} setOpen={setOpenViewPost} />}
        </div>
    )
}

export default HomePost
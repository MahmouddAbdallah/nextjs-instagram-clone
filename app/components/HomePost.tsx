import PostUserHeader from './PostUserHeader';
import LikeToPostHome from './LikeToPostHome';
import PostImg from './PostImg';
import { useState } from 'react';

const HomePost = ({ post }: { post: any }) => {
    const [isLike, setIsLike] = useState(post.isLike);
    const [count, setCount] = useState(post.likesCount)
    return (
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
            <div className='px-2 pt-2'>
                <LikeToPostHome
                    isLike={isLike}
                    setIsLike={setIsLike}
                    count={count}
                    setCount={setCount}
                    postId={post.id as string}
                />
            </div>
        </div>
    )
}

export default HomePost
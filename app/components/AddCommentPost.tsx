import React from 'react'
import { useForm } from 'react-hook-form';
import { commentType } from '../types/user';
import axios from 'axios';
import { addComment } from '../../redux/features/post';
import { useAppDispatch } from '../hooks/reduxHooks';
interface propsAddComment {
    postId: string,
}
const AddCommentPost: React.FC<propsAddComment> = ({ postId }) => {

    const { register, formState: { isValid }, handleSubmit, reset } = useForm<commentType>();

    const dispatch = useAppDispatch()
    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data } = await axios.post(`/api/comment`,
                {
                    text: formData.text,
                    postId: postId
                })
            dispatch(addComment(data.comment));
            reset()
        } catch (error) {
            console.error(error);
        }
    })
    return (
        <form onSubmit={onSubmit} className='w-full flex border-b'>
            <div className='w-full flex'>
                <input
                    type="text"
                    {...register('text', { required: true })}
                    placeholder='Add a comment...'
                    className='outline-none w-full py-2 pl-2 my-1 text-xs'
                />
                {isValid &&
                    <button
                        disabled={!isValid}
                        className='text-xs font-semibold text-blue-500 disabled:text-blue-300 px-2'>
                        Post
                    </button>
                }
            </div>
        </form>
    )
}

export default AddCommentPost
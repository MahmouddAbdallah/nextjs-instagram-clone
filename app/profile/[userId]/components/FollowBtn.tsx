import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import clsx from 'clsx'
import { LuLoader2 } from "react-icons/lu";
import { useAppSelector } from '@/app/hooks/reduxHooks';
import { useParams } from 'next/navigation';
const FollowBtn = () => {
    const { userId } = useParams()

    const [loading, seLoading] = useState(false)
    const [isFollow, setIsFollow] = useState(false);
    const user = useAppSelector(state => state.user)
    const handleFoller = async () => {
        try {
            seLoading(true)
            const { data } = await axios.post('/api/followers', {
                followerId: userId
            })
            setIsFollow(data.isFollow);
            seLoading(false)
        } catch (error) {
            console.error(error);
            seLoading(false)
        }
    }

    const handleIsFollow = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`/api/followers/${userId}`)
                setIsFollow(data.isFollow);
            } catch (error) {
                console.error(error);
                seLoading(false)
            }
        }, [userId]
    )
    useEffect(() => {
        if (!(user.id == userId)) {
            handleIsFollow();
        }
    }, [handleIsFollow, user.id, userId])
    return (
        <button
            onClick={handleFoller}
            className={clsx(
                '  rounded-md px-7 py-2 whitespace-nowrap text-xs font-semibold',
                { 'bg-black/5': isFollow },
                { 'bg-blue-500 text-white': !isFollow }
            )}>
            {loading ? <LuLoader2 className='animate-spin w-3 h-3' /> : isFollow ? "Following" : "Follow"}
        </button>
    )
}

export default FollowBtn
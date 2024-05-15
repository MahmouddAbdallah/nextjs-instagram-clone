'use client'
import React, { createContext, useContext, useState } from 'react';

interface postInterfaceContext {
    isLike: boolean,
    setIsLike: React.Dispatch<React.SetStateAction<boolean>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}
const appPostProviderContext = createContext<postInterfaceContext | undefined>(undefined);
const PostProvider = ({ children, post }: { children: React.ReactNode, post: any }) => {
    const [isLike, setIsLike] = useState(post.isLike);
    const [count, setCount] = useState(post.likesCount)
    return (
        <appPostProviderContext.Provider value={{ isLike, setIsLike, count, setCount }}>
            {children}
        </appPostProviderContext.Provider>
    );
};

export const usePostContext = () => {
    return useContext(appPostProviderContext)
}
export default PostProvider;

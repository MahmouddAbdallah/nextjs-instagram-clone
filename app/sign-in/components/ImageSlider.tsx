'use client'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'
import styles from '../signIn.module.css'
const ImageSlider = () => {
    const [index, setIndex] = React.useState(0)
    const images = [
        '/images/sign-in-page-img-1.png',
        '/images/sign-in-page-img-2.png',
        '/images/sign-in-page-img-3.png',
        '/images/sign-in-page-img-4.png',
    ]
    const nextImage = useCallback(() => {
        setIndex(index == images.length - 1 ? 0 : index + 1)
    }, [images.length, index]);
    useEffect(() => {
        const autoChange = setInterval(nextImage, 5000)
        return () => { clearInterval(autoChange) }
    }, [nextImage])

    return (
        <div>
            {images.map((image, i) => {
                return (
                    <Image
                        key={image}
                        height={300}
                        width={300}
                        className={`w-52 ${index == i ? styles.easeInAnim : styles.easeOutAnim}`}
                        src={image}
                        alt=''
                    />
                )
            })}
        </div>
    )
}

export default ImageSlider
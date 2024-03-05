import React from 'react'
interface ErrorMsgProps {
    message: string
}
const ErrorMsg: React.FC<ErrorMsgProps> = ({ message }) => {
    return (
        message &&
        <div>
            <span className='text-xs font-semibold text-red-500'>
                {message}
            </span>
        </div>
    )
}

export default ErrorMsg
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Sidebar from './components/Sidebar'

const Home = () => {
    const token = cookies().get('token_auth')
    if (!token) {
        redirect('/sign-in')
    }
    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <div>
                    Home
                </div>
            </div>
        </div>
    )
}

export default Home
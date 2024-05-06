import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import HomePosts from '../components/HomePosts';
import Statuses from '../components/Statuses';


const Home = () => {
    const token = cookies().get('token_auth')
    if (!token) {
        redirect('/sign-in')
    }
    return (
        <div>
            <Statuses />
            <HomePosts />
        </div>
    )
}

export default Home
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Home = () => {
  const token = cookies().get('token_auth')
  if (!token) {
    redirect('/sign-in')
  }
  return (
    <div>
      Home
    </div>
  )
}

export default Home
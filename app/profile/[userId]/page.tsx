import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import prisma from '@/prisma/client'
import ProfileHeader from './components/ProfileHeader';

const Profile = async ({ params }: { params: Params }) => {
    const { userId } = params;
    const user = await prisma?.users.findUnique({
        where: {
            id: userId
        }
        , select: {
            id: true,
            name: true,
            username: true,
            email: true,
            picture: true,
        }
    })

    return (
        <div className='lg:flex justify-center'>
            <div className='lg:w-[900px]'>
                <ProfileHeader user={user} />
            </div>
        </div>
    )
}

export default Profile
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import prisma from '@/prisma/client'
const Profile = async ({ params }: { params: Params }) => {
    const { userId } = params;
    const data = await prisma?.users.findUnique({
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
        <div>

        </div>
    )
}

export default Profile
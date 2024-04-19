import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ProfileHeader from './ProfileHeader';
import NavbarPosts from './NavbarPosts';
import axios from 'axios';

const Profile = async ({ params }: { params: Params }) => {
    const { userId } = params;
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/user/${userId}`)
            return data.user
        } catch (error) {
            console.error(error);
        }
    }
    const user = await fetchUser()

    return (
        <div >
            <ProfileHeader user={user} />
            <NavbarPosts />
        </div>
    )
}

export default Profile
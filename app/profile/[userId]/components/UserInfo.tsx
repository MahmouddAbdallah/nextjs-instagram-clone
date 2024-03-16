import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ProfileHeader from './ProfileHeader';
import NavbarPosts from './NavbarPosts';

const Profile = async ({ params }: { params: Params }) => {
    const { userId } = params;
    const fetchUser = async () => {
        const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'GET',
            credentials: "include",
        })
        if (!res.ok) throw new Error("Could not fetch the user")
        const data = await res.json()
        return data.user
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
import { postType } from "@/app/types/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Post from "./components/Post";

const Posts = async ({ params }: { params: Params }) => {
    const { userId } = params
    const fetchUserPosts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/${userId}`, {
                method: "GET",
                credentials: 'include',
                cache: 'no-cache'
            })
            if (!res.ok) throw new Error('Could not fetch user posts');
            const data = await res.json();
            return data
        } catch (error) {
            console.error(error);
        }
    }
    const data = await fetchUserPosts()

    return (
        <div>
            <div className="grid gap-1 grid-cols-12">
                {data?.posts?.map((post: postType) =>
                    <Post key={post.id} post={post} />
                )}
            </div>
        </div>
    )
}

export default Posts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(req: Request, { params }: { params: Params }) {
    try {
        const { userId } = params;

        const posts = await prisma.post.findMany({
            where: {
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        picture: true,
                        name: true,
                        username: true
                    }
                },
                likes: {
                    take:3,
                    select: {
                        id: true,
                        user:{
                            select:{
                                id:true,
                                picture:true,
                            }
                        }
                    }
                },
            }
        })
        
        // const postsWithLikesCount = await Promise.all(posts.map(async (post) => {
        //     const likesCount = await prisma.postLike.count({
        //         where: {
        //             postId: post.id
        //         }
        //     });
        //     return { ...post, likesCount };
        // }));
        // console.log(postsWithLikesCount);

        return NextResponse.json({ posts })

    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
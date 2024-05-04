import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/prisma/client'
import { verifyAuth } from '@/app/lib/verfiyAuth';
import uploadImage from '@/app/lib/uploadImage';


export async function POST(req: Request) {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) {
            const formData = await req.formData()
            const image = formData.get('image') as File;
            const title = formData.get('title') as string
            const id = verfiy.id;
            const url = await uploadImage(image)

            const post = await prisma.post.create({
                data: {
                    user: {
                        connect: {
                            id: id
                        }
                    },
                    title,
                    image: url as string
                }
            })
            return NextResponse.json({ post })
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server' }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        // const url = new URL(req.url);
        // const query = new URLSearchParams(url.search);
        // const userId = query.get('userId');
        const verfiy = await verifyAuth();
        if (!verfiy) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    Followers: {
                        some: {
                            followingId: verfiy.id as string
                        }
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: true,
                    }
                },
                likes: {
                    select: {
                        id: true,
                        userId: true
                    }
                },
            },
        })
        const postsWithLikesCount = posts.map(post => ({
            id: post.id,
            title: post.title,
            image: post.image,
            user: {
                id: post.user.id,
                username: post.user.username,
                picture: post.user.picture
            },
            isLike: post.likes.some(isLike => isLike.userId == verfiy.id),
            likesCount: post.likes.length
        }));
        return NextResponse.json({ posts: postsWithLikesCount }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server' }, { status: 400 })
    }
}
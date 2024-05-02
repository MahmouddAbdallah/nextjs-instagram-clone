import { NextResponse, NextRequest } from "next/server";
import prisma from '@/prisma/client';
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search)
        const userId = searchParams.get('userId')
        const [user, postNumber, followingNumber, followerNumber] = await prisma.$transaction([
            prisma.users.findFirst({
                where: {
                    id: userId as string
                },
                select: {
                    email: true,
                    username: true,
                    name: true,
                    picture: true,
                    id: true,
                },
            }),
            prisma.post.aggregate({
                where: {
                    userId: userId as string
                },
                _count: true,
            }),
            prisma.follow.aggregate({
                where: {
                    followingId: userId as string
                },
                _count: true
            }),
            prisma.follow.aggregate({
                where: {
                    followerId: userId as string
                },
                _count: true
            }),
        ])
        return NextResponse.json({
            user,
            postNumber: postNumber._count,
            followingNumber: followingNumber._count,
            followerNumber: followerNumber._count
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server!!' }, { status: 400 })
    }
}
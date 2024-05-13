import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';

interface bodyInterface {
    followerId: string
}
export async function POST(req: NextRequest) {
    try {
        const body: bodyInterface = await req.json();
        const verfiy = await verifyAuth();
        if (!verfiy) return NextResponse.json({ message: "Invalid" }, { status: 400 });
        const isFollow = await prisma.follow.findFirst({
            where: {
                followingId: verfiy.id,
                followerId: body.followerId
            }
        })
        if (isFollow) {
            await prisma.follow.deleteMany({
                where: {
                    followingId: verfiy.id,
                    followerId: body.followerId
                }
            })
            return NextResponse.json({ isFollow: false }, { status: 201 });
        }
        else {
            await prisma.follow.create({
                data: {
                    followingId: verfiy.id,
                    followerId: body.followerId
                }
            })
            return NextResponse.json({ isFollow: true }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const userId = query.get('userId')
        const skip = (parseInt(query.get('skip') as string)) || 0;

        if (userId) {
            const followers = await prisma.follow.findMany({
                where: {
                    followerId: userId as string
                    // ,AND:{
                    //     follower:{
                    //         OR:[]
                    //     }
                    // }
                },
                take: 2,
                skip: skip,
                select: {
                    id: true,
                    following: {
                        select: {
                            username: true,
                            name: true,
                            picture: true
                        }
                    }
                }
            })
            return NextResponse.json({ followers }, { status: 200 })
        }
        return NextResponse.json({ message: 'Please HHHHHHHHH wahtdk' }, { status: 400 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const followId = query.get('followId')
        const userId = query.get('userId')
        const user = await verifyAuth();
        if (!user) return NextResponse.json({ message: "Invalid" }, { status: 400 });
        if (user.id != userId) return NextResponse.json({ message: "Invalid" }, { status: 400 });
        if (followId) {
            await prisma.follow.delete({ where: { id: followId as string } })
            return NextResponse.json({ message: 'Deleted Sucessfully!!' }, { status: 200 })
        }
        return NextResponse.json({ message: 'Please HHHHHHHHH wahtdk' }, { status: 400 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}



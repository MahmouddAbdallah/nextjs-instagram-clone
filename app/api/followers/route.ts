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
            const follow = await prisma.follow.deleteMany({
                where: {
                    followingId: verfiy.id,
                    followerId: body.followerId
                }
            })
            return NextResponse.json({ isFollow: false }, { status: 201 });
        }
        else {
            const follow = await prisma.follow.create({
                data: {
                    followingId: verfiy.id,
                    followerId: body.followerId
                }
            })
            return NextResponse.json({ isFollow: true }, { status: 201 });
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error })
    }
}


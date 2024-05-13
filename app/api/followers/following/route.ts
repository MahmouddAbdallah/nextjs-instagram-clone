import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const userId = query.get('userId')
        const skip = (parseInt(query.get('skip') as string)) || 0;

        if (userId) {
            const followers = await prisma.follow.findMany({
                where: {
                    followingId: userId as string
                    // ,AND:{
                    //     follower:{
                    //         OR:[]
                    //     }
                    // }
                },
                take: 6,
                skip: skip,
                select: {
                    id: true,
                    follower: {
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
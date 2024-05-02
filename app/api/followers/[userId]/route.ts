import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';


export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const verfiy = await verifyAuth();
        const { userId } = params
        if (!verfiy) return NextResponse.json({ message: "Invalid" }, { status: 400 });
        const isFollow = await prisma.follow.findFirst({
            where: {
                followingId: verfiy.id,
                followerId: userId
            }
        })
        if (isFollow)
            return NextResponse.json({ isFollow: true }, { status: 200 });
        else
            return NextResponse.json({ isFollow: false }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server!!' }, { status: 400 })
    }
}
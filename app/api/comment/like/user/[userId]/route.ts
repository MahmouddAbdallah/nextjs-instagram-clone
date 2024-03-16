import prisma from '@/prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { userId } = params
        const likeComment = await prisma.likeComment.findFirst({
            where: {
                user: {
                    some: { id: userId }
                }
            }
        })
        return NextResponse.json({ isLike: !!likeComment })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
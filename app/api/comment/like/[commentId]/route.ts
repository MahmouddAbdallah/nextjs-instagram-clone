import prisma from '@/prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { commentId } = params

        const likeComment = await prisma.likeComment.findMany({
            where: {
                commentId: commentId
            }
        })
        return NextResponse.json({ commentId, likeComment: likeComment.length })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
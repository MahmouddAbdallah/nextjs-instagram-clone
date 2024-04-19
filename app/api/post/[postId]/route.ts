import { verifyAuth } from '@/app/lib/verfiyAuth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const verfiy = await verifyAuth()
        if (verfiy) {
            const { postId } = params
            const post = await prisma.post.delete({ where: { id: postId } });
            return NextResponse.json({ post })
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
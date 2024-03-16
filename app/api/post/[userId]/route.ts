import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'
import { verifyAuth } from '@/app/lib/verfiyAuth';
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
                }
            }
        })
        return NextResponse.json({ posts })

    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
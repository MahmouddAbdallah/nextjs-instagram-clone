import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth'

export async function POST(req: NextRequest) {
    try {
        const verify = await verifyAuth()
        if (verify) {
            const body = await req.json();
            if (body.text) {
                const comment = await prisma.comment.create({
                    data: {
                        text: body.text as string,
                        userId: verify.id,
                        postId: body.postId as string
                    },
                    select: {
                        id: true,
                        text: true,
                        user: {
                            select: {
                                id: true,
                                picture: true,
                                username: true,
                            }
                        },
                        CommentLike: true
                    }
                })
                return NextResponse.json({
                    message: 'You create comment',
                    comment
                })
            } else {
                return NextResponse.json({ message: 'Please enter the comment' })
            }
        }
        else return NextResponse.redirect(new URL('/sign-in', req.url))

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth'

export async function POST(req: NextRequest) {
    try {
        const verfiy = await verifyAuth()
        if (verfiy) {
            const body = await req.json();
            if (body.text) {
                const comment = await prisma.comment.create({
                    data: {
                        text: body.text,
                        user: {
                            connect: {
                                id: verfiy.id
                            }
                        },
                        post: {
                            connect: {
                                id: body.postId
                            }
                        }
                    },
                    select: {
                        user: {
                            select: {
                                id: true,
                                picture: true,
                                username: true
                            }
                        },
                        text: true,
                        reply: true
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
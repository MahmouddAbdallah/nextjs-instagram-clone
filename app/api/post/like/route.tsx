import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/verfiyAuth";
import prisma from '@/prisma/client'


export async function PUT(req: NextRequest) {
    try {
        const verify = await verifyAuth();
        if (verify) {
            const { postId } = await req.json();
            if (!postId) return NextResponse.json({ message: 'Invalid postId' });

            // Checking the user is like of this post or not
            const like = await prisma.postLike.findFirst({ where: { postId: postId, userId: verify.id } })

            if (like) {
                await prisma.postLike.delete({ where: { id: like.id } })
                return NextResponse.json({ message: 'Unliked Successfully', userId: verify.id })
            } else {
                const create = await prisma.postLike.create({
                    data: {
                        postId,
                        userId: verify.id
                    }
                })
                return NextResponse.json({ message: 'Liked Successfully', userId: verify.id })
            }
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message })
    }
}
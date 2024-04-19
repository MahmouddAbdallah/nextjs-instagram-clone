import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyAuth } from "@/app/lib/verfiyAuth";

export async function PUT(req: NextRequest) {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) {
            const body = await req.json();
            const { commentId } = body
            if (!commentId) return NextResponse.json({ message: 'where the commentId' })
            const like = await prisma.commentLike.findFirst({
                where: {
                    commentId,
                    userId: verfiy.id
                }
            })
            if (like) {
                const deleteLike = await prisma.commentLike.delete({
                    where: {
                        id: like.id
                    }
                })
                return NextResponse.json({ userId: deleteLike.userId, commentId: deleteLike.commentId, type: 'delete' })
            } else {
                const createLike = await prisma.commentLike.create({
                    data: {
                        commentId,
                        userId: verfiy.id
                    }
                })
                return NextResponse.json({ userId: createLike.userId, commentId: createLike.commentId, type: 'create' })
            }
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
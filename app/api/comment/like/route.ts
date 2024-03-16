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
            let like = await prisma.likeComment.findFirst({
                where: {
                    user: {
                        some: { id: verfiy.id }
                    }
                }
            })
            if (like) {
                like = await prisma.likeComment.delete({
                    where: {
                        id: like.id
                    }
                })
                return NextResponse.json({ like, deleted: true })
            } else {
                like = await prisma.likeComment.create({
                    data: {
                        commentId,
                        user: {
                            connect: {
                                id: verfiy.id
                            }
                        }
                    }
                })
                return NextResponse.json({ like })
            }
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
import { verifyAuth } from "@/app/lib/verfiyAuth";
import prisma from "@/prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const verify = await verifyAuth();
        if (verify) {
            const { postId } = params;
            const comments = await prisma.comment.findMany({
                where: {
                    postId
                },
                select: {
                    id: true,
                    text: true,
                    user: {
                        select: {
                            id: true,
                            picture: true,
                            username: true
                        }
                    },
                    CommentLike: {
                        where: {
                            userId: verify.id
                        },
                        select: {
                            userId: true
                        }
                    }
                }
            })
            return NextResponse.json({ comments })
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
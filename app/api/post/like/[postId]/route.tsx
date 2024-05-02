import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/verfiyAuth";
import prisma from '@/prisma/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';



export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const verify = await verifyAuth();
        if (verify) {
            const { postId } = params
            const [likes, isLike, threeUsers] = await prisma.$transaction([
                prisma.postLike.aggregate({
                    where: {
                        postId: postId
                    },
                    _count: true
                }), prisma.postLike.aggregate({
                    where: {
                        userId: verify.id,
                        postId: postId
                    },
                    _count: true
                }), prisma.postLike.findMany({
                    where: {
                        postId: postId,
                        userId: { not: verify.id }
                    }, take: 3,
                    select: {
                        user: {
                            select: {
                                id: true,
                                picture: true,
                                username: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
            ])
            return NextResponse.json({ count: likes._count, isLike: isLike._count == 1 ? true : false, users: threeUsers })
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message })
    }
}
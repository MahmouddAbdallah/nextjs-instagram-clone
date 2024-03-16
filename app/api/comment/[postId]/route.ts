import prisma from "@/prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { postId } = params;
        const comments = await prisma.comment.findMany({
            where: {
                postId
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
        return NextResponse.json({ comments })

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
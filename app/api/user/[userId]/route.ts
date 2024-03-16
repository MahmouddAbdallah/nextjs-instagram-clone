import { NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: { params: Params }) => {
    try {
        const { userId } = params
        const user = await prisma.users.findUnique({
            where: {
                id: userId as string
            }
        })
        if (user) {
            return NextResponse.json({ user })
        } else {
            return NextResponse.redirect(new URL('/', req.url))
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
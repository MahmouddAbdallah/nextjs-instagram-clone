import { NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { verifyAuth } from "@/app/lib/verfiyAuth";

export const GET = async (req: Request) => {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) return NextResponse.json({ user: verfiy })
        else return NextResponse.redirect(new URL('/sign-in', req.url))
    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
export const PUT = async (req: Request) => {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) {
            const body = await req.json();
            const user = await prisma.users.update({
                where: {
                    id: verfiy.id
                },
                data: body,
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    picture: true,
                }
            })
            return NextResponse.json({ user })
        }
        else return NextResponse.redirect(new URL('/sign-in', req.url))

    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', status: 400 });
    }
}
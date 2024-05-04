import { NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { verifyAuth } from "@/app/lib/verfiyAuth";

export const GET = async (req: Request) => {
    try {
        const verfiy = await verifyAuth();
        if (!verfiy) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const keyword = query.get('keyword');
        if (keyword) {
            const users = await prisma.users.findMany({
                where: {
                    id: { not: verfiy.id },
                    OR: [
                        { username: { contains: keyword as string, mode: 'insensitive' } },
                        { name: { contains: keyword as string, mode: 'insensitive' } }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    picture: true,
                },
                take: 10
            })
            return NextResponse.json({ users }, { status: 200 });
        }
        return NextResponse.json({ message: 'No Data' }, { status: 400 });
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
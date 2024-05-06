import prisma from '@/prisma/client'
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';


export async function GET(req: NextRequest) {
    try {

        // const bearerToken = req.headers.get('authorization') as string
        // const token = bearerToken.split(' ')[1]
        // const verfiy = await verifyAuth(token as string);
        // if (!verfiy) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const url = new URL(req.url)
        const query = new URLSearchParams(url.search)
        const userId = query.get('userId') as string

        const [statuses, user] = await prisma.$transaction([
            prisma.status.findMany({
                where: {
                    userId: userId as string,
                    createAt: {
                        gte: yesterday
                    }
                },
            }), prisma.users.findUnique({
                where: {
                    id: userId as string
                },
                select: {
                    id: true,
                    picture: true,
                    username: true
                }
            })
        ])

        return NextResponse.json({ statuses, user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server sdfds' }, { status: 400 })
    }
}
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';

export async function GET(req: NextRequest) {
    try {
        const bearerToken = req.headers.get('authorization') as string
        const token = bearerToken.split(' ')[1]
        const user = await verifyAuth(token);
        if (!user) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: user.id },
                    { receiverId: user.id }
                ]
            }, select: {
                id: true,
                sender: {
                    select: {
                        id: true,
                        username: true,
                        picture: true
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        picture: true
                    }
                }
            }
        })
        const filterData = chats.map((curr) => {
            if (curr.receiver.id == user.id) {
                return {
                    id: curr.id,
                    user: curr.sender
                }
            } else {
                return {
                    id: curr.id,
                    user: curr.receiver
                }
            }
        },)
        return NextResponse.json({ chats: filterData }, { status: 200 })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
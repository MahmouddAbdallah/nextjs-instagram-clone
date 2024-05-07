import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';

interface bodyInterface {
    receiverId: string;
    chatId: string;
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: bodyInterface = await req.json();
        const user = await verifyAuth();
        if (!user) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const chat = await prisma.chat.findFirst({
            where: {
                id: body.chatId,
                receiverId: body.receiverId,
                senderId: user.id
            }
        })
        if (!chat) {
            const chat = await prisma.chat.create({
                data: {
                    latestMessage: body.content,
                    senderId: user.id,
                    receiverId: body.receiverId
                }
            })
            const message = await prisma.message.create({
                data: {
                    senderId: user.id,
                    content: body.content,
                    chatId: chat.id,
                },
                select: {
                    id: true,
                    content: true,
                    sender: {
                        select: {
                            id: true,
                            username: true,
                            picture: true
                        }
                    }
                }
            })
            return NextResponse.json({ message, chat }, { status: 201 })
        } else {
            const [message] = await prisma.$transaction([
                prisma.message.create({
                    data: {
                        chatId: chat.id,
                        content: body.content,
                        senderId: user.id
                    },
                    select: {
                        id: true,
                        content: true,
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                picture: true
                            }
                        }
                    }
                })
                , prisma.chat.update({
                    where: {
                        id: chat.id
                    },
                    data: {
                        latestMessage: body.content
                    }
                })
            ])
            return NextResponse.json({ message }, { status: 201 })
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
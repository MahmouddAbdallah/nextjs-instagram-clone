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
                OR: [
                    {
                        senderId: user.id,
                        receiverId: body.receiverId
                    },
                    {
                        senderId: body.receiverId,
                        receiverId: user.id
                    }
                ]
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
/*
export async function GET(req: NextRequest) {
    try {
        const bearerToken = req.headers.get('authorization') as string
        const token = bearerToken?.split(' ')[1]
        const user = await verifyAuth(token);
        if (!user) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const url = new URL(req.url)
        const query = new URLSearchParams(url.search);
        const chatId = query.get('chatId');
        if (!chatId) return NextResponse.json({ message: 'Please Select chat' }, { status: 400 });
        const messages = await prisma.message.findMany({
            where: { chatId: chatId },
            select: {
                id: true,
                content: true,
                createdAt: true,
                chatId: true,
                sender: {
                    select: {
                        id: true,
                        username: true,
                        picture: true,
                    }
                }
            }
        })
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
*/

export async function GET(req: NextRequest) {
    try {
        const bearerToken = req?.headers?.get('authorization') as string
        const token = bearerToken?.split(' ')[1]
        const user = await verifyAuth(token);
        if (!user) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const url = new URL(req.url)
        const query = new URLSearchParams(url.search);
        const chatId = query.get('chatId');
        const receiverId = query.get('userId') as string;
        if (!chatId) return NextResponse.json({ message: 'Please Select chat' }, { status: 400 });
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        chat: {
                            senderId: user.id,
                            receiverId: receiverId
                        }
                    },
                    {
                        chat: {
                            senderId: receiverId,
                            receiverId: user.id
                        }
                    }
                ]
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                chatId: true,
                sender: {
                    select: {
                        id: true,
                        username: true,
                        picture: true,
                    }
                }
            }
        })
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
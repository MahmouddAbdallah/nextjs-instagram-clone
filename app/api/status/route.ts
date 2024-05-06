import prisma from '@/prisma/client'
import uploadImgStatus from '@/app/lib/uploadImgStatus';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/app/lib/verfiyAuth';

export async function POST(req: Request) {
    try {
        const verfiy = await verifyAuth();
        if (!verfiy) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const formData = await req.formData()
        const image = formData.get('image') as File;
        const text = formData.get('text') as string;
        const url = await uploadImgStatus(image);
        const status = await prisma.status.create({
            data: {
                userId: verfiy.id,
                text,
                Image_status: url as string,
            }
        })
        return NextResponse.json({ status }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server' }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const bearerToken = req.headers.get('authorization') as string
        const token = bearerToken.split(' ')[1]
        const verfiy = await verifyAuth(token as string);
        if (!verfiy) return NextResponse.json({ message: 'Please sign in' }, { status: 400 });
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const statuses = await prisma.status.findMany({
            where: {
                user: {
                    Followers: {
                        some: {
                            followingId: verfiy.id as string
                        }
                    }
                },
                createAt: {
                    gte: yesterday
                }
            }, select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        picture: true,
                        username: true
                    }
                }
            },
        })
        const uniqueUsers = Object.values(statuses.reduce((acc: any, status: any) => {
            const userId = status.user.id as string;
            if (!acc[userId]) {
                acc[userId] = status;
            }
            return acc;
        }, {}));

        return NextResponse.json({ statuses: uniqueUsers }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'there is error in server' }, { status: 400 })
    }
}
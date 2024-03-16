import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'
import { verifyAuth } from '@/app/lib/verfiyAuth';
import uploadImage from '@/app/lib/uploadImage';

export async function POST(req: Request) {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) {
            const formData = await req.formData()
            const image = formData.get('image') as File;
            const title = formData.get('title') as string
            const id = verfiy.id;
            const url = await uploadImage(image)

            const post = await prisma.post.create({
                data: {
                    user: {
                        connect: {
                            id: id
                        }
                    },
                    title,
                    image: url as string
                }
            })
            return NextResponse.json({ post })
        } else {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error })
    }
}
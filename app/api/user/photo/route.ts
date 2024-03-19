import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { verifyAuth } from "@/app/lib/verfiyAuth";
import uploadImage from "@/app/lib/uploadImage";
import deleteImage from "@/app/lib/deleteImage";

export const PUT = async (req: NextRequest) => {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) {
            const formData = await req.formData();
            if (verfiy.picture) {
                const deleteImg = await deleteImage(verfiy.picture as string);
                if (deleteImg) {
                    const pictureURL = await uploadImage(formData.get('picture') as File)
                    const user = await prisma.users.update({
                        where: {
                            id: verfiy.id
                        },
                        data: {
                            picture: pictureURL as string
                        }
                    })
                    return NextResponse.json({ picture: user?.picture })
                }
                else {
                    throw new Error("Cant't upload image")
                }
            } else {
                const pictureURL = await uploadImage(formData.get('picture') as File)
                const user = await prisma.users.update({
                    where: {
                        id: verfiy.id
                    },
                    data: {
                        picture: pictureURL as string
                    }
                })
                return NextResponse.json({ picture: user?.picture })
            }
        }
        else return NextResponse.redirect(new URL('/sign-in', req.url))

    } catch (error: any) {
        return NextResponse.json({ error: error?.message, message: 'There is error in server', status: 400 });
    }
}
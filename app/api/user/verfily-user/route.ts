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
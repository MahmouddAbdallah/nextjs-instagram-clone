import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'
import { z } from 'zod'
import { verifyAuth } from '@/app/lib/verfiyAuth';

const postSchema = z.object({
    image: z.string(),
})
export async function GET(req: any) {
    try {
        const verfiy = await verifyAuth();
        if (verfiy) return NextResponse.json({ user: verfiy })

    } catch (error) {
        console.error();
    }
}
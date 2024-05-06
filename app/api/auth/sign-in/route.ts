import { z } from 'zod';
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const signInValidation = z.object({
    email: z.string().email(),
    password: z.string()
})
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        const validation = signInValidation.safeParse(body);
        if (validation.success) {
            const user = await prisma.users.findUnique({ where: { email: validation.data.email } })
            if (user) {
                const isMatch = await bcrypt.compare(validation.data.password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
                    cookies().set({
                        name: 'token_auth',
                        value: token,
                        httpOnly: true,
                        maxAge: 5454512,
                    })
                    return NextResponse.json({ message: "Successfully sign in", }, { status: 200 });
                } else {
                    return NextResponse.json({ message: "Invaild password!!!", }, { status: 401 });
                }
            } else {
                return NextResponse.json({ message: "User not found", }, { status: 401 });
            }
        } else {
            return NextResponse.json({ error: validation.error.errors }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: error, }, { status: 400 })
    }
}
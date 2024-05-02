import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email('This invalid email'),
    password: z.string(),
    username: z.string().min(3)
})
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = signUpSchema.safeParse(body)
        if (validation.success) {
            let user = await prisma.users.findUnique({
                where: {
                    email: validation.data.email,
                }
            })

            if (user?.email)
                return NextResponse.json({ message: 'This user is already registered' }, { status: 400 });

            user = await prisma.users.findUnique({
                where: {
                    username: validation.data.username,
                }
            })
            if (user?.username)
                return NextResponse.json({ message: 'This username is already userd, please enter a anthor username' }, { status: 400 });

            const passowrd = await bcrypt.hash(validation.data.password, 10)
            const newUser = await prisma.users.create({
                data: {
                    name: validation.data.name,
                    username: validation.data.username,
                    email: validation.data.email,
                    password: passowrd
                }
            })

            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string);
            cookies().set({
                name: 'token_auth',
                value: token,
                httpOnly: true,
                maxAge: 5454512,
            })
            return NextResponse.json({ message: 'Successfully sign up!!' }, { status: 201 });

        } else {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'There is error in server', }, { status: 400 });
    }
}
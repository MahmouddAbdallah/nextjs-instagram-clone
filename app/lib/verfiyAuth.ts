import prisma from '@/prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';
export const verifyAuth = async () => {
    try {
        const token = cookies().get('token_auth')?.value;
        if (!token) return false;
        else {
            const decode = jwt.verify(token as string, process.env.JWT_SECRET as string);
            const id = (decode as JwtPayload).id
            const user = await prisma.users.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
                }
            })
            if (!user) return false
            return user
        }
    } catch (error: any) {
        return false;
    }
}
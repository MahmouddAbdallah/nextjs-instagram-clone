import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        cookies().delete('token_auth')
        return NextResponse.json({ message: 'Log out successfully!!' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 });
    }
}
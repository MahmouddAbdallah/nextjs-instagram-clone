import React, { Suspense } from 'react'
import AppContextMsgProvider from './contxt-msg/ContextMsg';
import Messages from './component/Message';
import { redirect } from "next/navigation";

function Loading() {
    return <>Loading...</>
}
const page = async ({ searchParams }: { searchParams: { userId: string, chatId: string } }) => {
    const { userId, chatId } = searchParams
    const fetchUser = async () => {
        try {
            if (!userId) {
                if (userId?.length != 24) return
            }
            const res = await fetch(`${process.env.BASE_URL}/api/user/${userId}`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(await res.text());
            }

            const data = await res.json();
            return data.user
        } catch (error) {
            console.error(error);
        }
    }

    const data = await fetchUser();
    return (
        <Suspense fallback={<Loading />}>
            <AppContextMsgProvider user={data}  >
                <Messages
                    userId={userId}
                    chatId={chatId}
                />
            </AppContextMsgProvider>
        </Suspense>
    )
}

export default page
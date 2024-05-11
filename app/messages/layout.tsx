import Sidebar from "../components/Sidebar";
import Chats from "./component/Chats";
import AppContextMsgProvider from './contxt-msg/ContextMsg';
import { Suspense } from 'react'

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className='flex w-full'>
            <Sidebar />
            <div className="flex-1 w-full">
                {children}
            </div>
        </div>
    );
}

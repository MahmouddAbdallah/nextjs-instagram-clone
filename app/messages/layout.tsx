import Sidebar from "../components/Sidebar";
import Chats from "./component/Chats";
import AppContextMsgProvider from './contxt-msg/ContextMsg';
import { Suspense } from 'react'
function SearchBarFallback() {
    return <>placeholder</>
}
export default async function RootLayout({ children, }: { children: React.ReactNode }) {

    return (
        <Suspense fallback={<SearchBarFallback />}>
            <AppContextMsgProvider >
                <div className='flex w-full'>
                    <Sidebar />
                    <div className="flex-1 w-full">
                        <div className=" w-full grid grid-cols-12">
                            <div className="col-span-3">
                                <Chats />
                                {/* <Connect/> */}
                            </div>
                            <div className="col-span-9">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </AppContextMsgProvider>
        </Suspense>

    );
}

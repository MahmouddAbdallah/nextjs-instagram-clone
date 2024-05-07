import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chats from "./component/Chats";


export default async function RootLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="pb-5">
                    {/* <Chats /> */}
                    {children}
                </div>
            </div>
        </div>
    );
}

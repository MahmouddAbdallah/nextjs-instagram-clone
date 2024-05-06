import axios from 'axios';
import React from 'react'
import { toast } from 'react-hot-toast';

const Settings = ({ open }: { open: boolean }) => {
    const logout = async () => {
        try {
            localStorage.clear();
            const { data } = await axios.get('/api/logout');
            toast.success(data.message)
            window.location.reload()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'There is an Error')
            console.error({ error });
        }
    }
    return (
        <div className='relative'>
            {open && <div className='absolute sm:bottom-14 bg-white py-5 border rounded-md w-56'>
                <ul className='w-full px-3 space-y-3'>
                    <li className="w-full">
                        <button className='py-3 px-2 hover:bg-black/5 duration-150 w-full text-left rounded-md'>
                            Switch Accout
                        </button>
                    </li>
                    <li className="w-full">
                        <button onClick={logout} className='py-3 px-2 hover:bg-black/5 duration-150 w-full text-left rounded-md'>
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
            }
        </div>
    )
}

export default Settings
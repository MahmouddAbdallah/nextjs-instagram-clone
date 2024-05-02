import clsx from 'clsx';
import { useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import useClickOutside from '../hooks/useClickOutside';
const Search = ({ setOpenSearch }: { setOpenSearch: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const refElement = useClickOutside(() => setOpenSearch(false));
    return (
        <div>
            <button className='block py-2 sm:py-3 hover:bg-black/5 px-3 xl:pl-3 xl:w-48 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <div>
                        <MdOutlineSearch size={24} />
                    </div>
                    <span className={clsx(
                        'text-sm text-black/80 hidden xl:block',
                    )}>
                        Search
                    </span>
                </div>
            </button>
        </div>
    )
}

export default Search
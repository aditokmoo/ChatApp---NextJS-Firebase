import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function FilterList() {
    return (
        <div className="bg-dark z-40 border-b border-light-dark text-white p-4 sticky top-0 left-0 w-full">
            <div className="flex justify-between items-center">
                <Link href='/' className='text-sm flex items-center gap-2'><span className='bg-primary flex justify-center items-center shadow-lg w-6 h-6 font-semibold rounded-full text-xs'>2</span> Message request</Link>
                <button className='flex items-center gap-2 text-xs'><FaPlus />New group</button>
            </div>
        </div>
    )
}

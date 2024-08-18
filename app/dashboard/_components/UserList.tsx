'use client'
import useGetAllUsers from '@/hooks/useUser'
import Image from 'next/image';
import React from 'react'
import { FaSearch } from 'react-icons/fa';

export default function UserList() {
    const { data, isLoading } = useGetAllUsers();

    if (isLoading) return <div>Loading...</div>

    console.log(data)
    return (
        <div className='max-w-96 w-full bg-light-dark rounded-md'>
            <div className="flex justify-between items-center p-4 bg-[#15182e] rounded-t-md">
                <span className='text-white text-lg'>Users</span>
                <ul className="flex justify-end gap-4 items-center text-gray-200 text-sm">
                    <li className='cursor-pointer hover:opacity-80 bg-light-dark py-2 px-4 rounded-md'>All</li>
                    <li className='relative cursor-pointer hover:opacity-80 py-2 px-4 rounded-md'>
                        <div className="absolute top-[13px] left-1 w-2 h-2 bg-green rounded-full"></div>
                        Online
                    </li>
                    <li className='relative cursor-pointer hover:opacity-80 py-2 px-4 rounded-md'>
                        <div className="absolute top-[13px] left-1 w-2 h-2 bg-red rounded-full"></div>
                        Offline
                    </li>
                </ul>
            </div>
            <div className="relative p-4 flex items-center justify-center w-full flex-col">
                <FaSearch className='absolute left-[35px] text-gray-400' />
                <input type="text" placeholder='Search...' className='w-full p-4 text-sm bg-dark rounded-sm pl-12' />
            </div>
            {data?.map((item) => (
                <div className="w-full flex gap-3 items-center odd:bg-dark p-4 text-white cursor-pointer hover:opacity-80">
                    <div className="relative">
                        <Image src={item.avatar} alt="avatar" width={50} height={50} className='rounded-full' />
                        <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <span>{item.username}</span>
                        <span className='text-gray-500 text-sm'>{item.email}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

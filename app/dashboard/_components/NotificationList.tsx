'use client'

import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';

interface PropTypes {
    data: any
}

export default function NotificationList({data}: PropTypes) {
    console.log(data)

    if(data?.receivedRequests.length === 0) return <span className='text-gray-500 flex justify-center items-center mt-10'>Your notification inbox is empty.</span>

    return data?.receivedRequests?.map((userRequest) => (
        <div key={userRequest.id} className="relative w-full flex gap-3 items-center odd:bg-dark p-4 text-white">
            <div className="relative">
                <Image src={userRequest.avatar} alt="avatar" width={100} height={100} className='rounded-full' />
                <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
            </div>
            <div className="flex flex-col w-full">
                <span>{userRequest.username}</span>
                <span className='text-gray-500 text-xs'>{userRequest.username} has sent you friend request</span>
            </div>
            <div className="flex items-center gap-3 justify-end w-full">
                <div className="p-2 bg-green rounded-md cursor-pointer hover:opacity-70">
                    <FaCheck className='shadow-xl' />
                </div>
                <div className="p-2 bg-[#15182e] rounded-md cursor-pointer hover:opacity-70">
                    <FaTimes />
                </div>
            </div>
        </div>
    ))
}

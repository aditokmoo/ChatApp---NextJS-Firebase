import Image from 'next/image'
import React from 'react'
import { FaUser } from 'react-icons/fa6'

interface PropTypes {
    data: {
        id: number,
        name: string,
        avatar: any,
        message: string,
        lastMessageTime: string,
    }
}

export default function UserInfo({ data }: PropTypes) {
    return (
        <div className="bg-light-dark p-4 flex justify-between gap-6 rounded-xl hover:opacity-80 cursor-pointer">
            <div className="bg-gray-800 flex justify-center items-center p-6 rounded-full w-18 h-16">
                <FaUser className='text-white text-xl' />
            </div>
            <div className="flex flex-col gap-2 text-white w-full">
                <div className="flex justify-between">
                    <h4>{data.name}</h4>
                    <span className='text-xs text-gray-600'>{data.lastMessageTime}</span>
                </div>
                <p className='text-sm text-gray-500'>{data.message}</p>
            </div>
        </div>
    )
}

import React from 'react'
import { FaUser } from 'react-icons/fa6'

interface PropTypes {
    data: {
        id: number,
        name: string,
        avatar: any,
        message: string,
        lastMessageTime: string,
        status: boolean
        lastActive?: string,
        notification: boolean,
    }
}

export default function UserInfo({ data }: PropTypes) {
    return (
        <div className={`relative p-4 flex justify-between gap-6 border-t border-light-dark hover:opacity-80 cursor-pointer ${data.notification ? 'bg-dark' : 'bg-transparent'}`}>
            {data.notification && (
                <div className="flex items-center justify-center absolute bottom-8 right-6 rounded-full bg-[#346bad] w-3 h-3 text-xs font-bold text-center"></div>
            )}
            <div className="relative bg-gray-800 flex justify-center items-center p-6 rounded-full w-18 h-16">
                <FaUser className='text-white text-xl' />
                {data.status ? (
                    <div className='absolute top-1 right-1 rounded-full w-3 h-3 bg-green'></div>
                ):(
                    <p className='absolute bottom-0 text-[9px] text-gray-400 rounded-full bg-[#9fc4bc] text-[#000] font-bold px-2'>{data.lastActive}</p>
                )}
            </div>
            <div className="flex flex-col gap-2 text-white w-full">
                <div className="flex justify-between">
                    <h4 className={data.notification ? 'font-bold' : 'font-medium'}>{data.name}</h4>
                    <span className='text-xs text-gray-600'>{data.lastMessageTime}</span>
                </div>
                <p className={`text-sm text-gray-500 w-72 ${data.notification ? 'font-medium text-gray-300': 'font-regular'}`}>{data.message}</p>
            </div>
        </div>
    )
}

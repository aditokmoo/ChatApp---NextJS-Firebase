import Image from 'next/image'
import React from 'react'

interface PropTypes {
    data: {
        id: number,
        username: string,
        avatar: any,
        message: string,
        lastMessageTime: string,
        status: boolean
        lastActive?: string,
        notification: boolean,
    }
}

export default function UserInfo({ data }: PropTypes) {
    console.log(data.user)
    return (
        <div className={`relative py-4 px-6 flex justify-between gap-6 border-t border-light-dark hover:opacity-80 cursor-pointer ${data.notification ? 'bg-dark' : 'bg-transparent'}`}>
            {data.notification && (
                <div className="flex items-center justify-center absolute bottom-8 right-6 rounded-full bg-[#346bad] w-3 h-3 text-xs font-bold text-center"></div>
            )}
            <div className="relative flex justify-center flex-col items-center">
                <Image src={data?.user.avatar} alt="profile" width={70} height={70} className="rounded-full" />
                {data.status ? (
                    <div className='absolute top-1 right-1 rounded-full w-3 h-3 bg-green'></div>
                ):(
                    <p className='absolute bottom-0 py-[2px] text-[9px] text-gray-400 rounded-full bg-[#dff7eb] text-[#000] font-bold px-2'>{data.lastActive} 15min</p>
                )}
            </div>
            <div className="flex flex-col text-white w-full justify-center">
                <div className="flex justify-between">
                    <h4 className={data.notification ? 'font-bold' : 'font-medium'}>{data.user.username}</h4>
                    <span className='text-xs text-gray-600'>{data.lastMessageTime}</span>
                </div>
                <p className={`text-sm text-gray-500 w-72 ${data.notification ? 'font-medium text-white': 'font-regular'}`}>{data.message ? data.message : 'Send first message to start chating'}</p>
            </div>
        </div>
    )
}

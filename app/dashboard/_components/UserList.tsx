'use client'
import useGetAllUsers from '@/hooks/useUser'
import { useUserStore } from '@/zustand/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TbMessageDots } from "react-icons/tb";
import { FaSearch, FaUserFriends } from 'react-icons/fa';
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUsers } from 'react-icons/fa6';
import { LiaUserCheckSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { useSendFriendRequest, useStartChat } from '@/hooks/useUserActions';
import { MoonLoader } from 'react-spinners';

export default function UserList() {
    const [activeTab, setActiveTab] = useState('users');
    const { data, isLoading } = useGetAllUsers();
    const { currentUser } = useUserStore();
    const { mutate: startChat, isPending: isLoadingChat } = useStartChat();
    const { mutate: sendFriendRequest, data: requests, isPending: isLoadingFriendRequest } = useSendFriendRequest(currentUser);

    if (isLoading || isLoadingChat) return <div>Loading...</div>

    console.log(data)

    return (
        <div className='relative shadow-xl max-w-[450px] w-full bg-light-dark rounded-md'>
            <div className="bg-[#15182e] flex items-center w-full">
                <ul className="flex text-gray-200 text-sm items-center w-full">
                    <li onClick={() => setActiveTab('users')} className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${activeTab === 'users' ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        <FaUsers data-tip="All Users" className='text-xl' />
                        Users
                    </li>
                    <li onClick={() => setActiveTab('friends')} className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${activeTab === 'friends' ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        <FaUserFriends data-tip="All Friends" className='text-xl' />
                        Friends
                    </li>
                    <li onClick={() => setActiveTab('notifications')} className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${activeTab === 'notifications' ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        <IoNotificationsOutline className='text-xl' />
                        Notifications
                    </li>
                </ul>
            </div>

            <div className="flex flex-col w-full">
                <div className="relative p-4 flex items-center justify-center w-full flex-col">
                    <FaSearch className='absolute left-[35px] text-gray-400' />
                    <input type="text" placeholder='Search...' className='w-full p-4 text-sm bg-dark rounded-sm pl-12' />
                </div>
                {data
                    ?.sort((a, b) => (a.id === currentUser?.id ? -1 : b.id === currentUser?.id ? 1 : 0))
                    .map((user) => (
                        <div key={user.id} className="relative w-full flex gap-3 items-center odd:bg-dark p-4 text-white cursor-pointer hover:opacity-80">
                            <div className="relative">
                                <Image src={user.avatar} alt="avatar" width={50} height={50} className='rounded-full' />
                                <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span>{user.username}</span>
                                <span className='text-gray-500 text-xs'>{user.email}</span>
                            </div>
                            {currentUser?.id !== user?.id && (
                                <div className="absolute right-4 top-7 flex items-center gap-2">
                                    <div className="bg-[#15182e] hover:opacity-60 p-2 rounded-full">
                                        <TbMessageDots className='text-gray-400 text-xl cursor-pointer' onClick={() => startChat({ currentUser, user })} />
                                    </div>
                                    <div className="bg-[#15182e] hover:opacity-60 p-2 rounded-full">
                                        {isLoadingFriendRequest ? (
                                            <MoonLoader />
                                        ) : (
                                            requests?.sentRequests.includes(user.id) ? (
                                                <LiaUserCheckSolid className='text-gray-400 text-xl cursor-pointer' onClick={() => sendFriendRequest({currentUser, user})} />
                                            ) : (
                                                <AiOutlineUserAdd className='text-gray-400 text-xl cursor-pointer' onClick={() => sendFriendRequest({currentUser, user})} />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

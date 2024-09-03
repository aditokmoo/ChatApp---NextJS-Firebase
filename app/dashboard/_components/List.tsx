'use client'
import { useState } from 'react'
import UserList from './UserList'
import FriendList from './FriendList';
import NotificationList from './NotificationList';
import { FaUsers } from 'react-icons/fa6';
import { FaUserFriends } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useUserStore } from '@/zustand/userStore';
import { useGetFriendRequests } from '@/hooks/useFriendRequest';

export default function List() {
    const [activeTab, setActiveTab] = useState('users');
    const { currentUser } = useUserStore();
    const { data: friendRequests, isLoading } = useGetFriendRequests(currentUser);

    if (isLoading) return <h2>Loading...</h2>

    return (
        <div className='relative shadow-xl max-w-[480px] w-full bg-light-dark rounded-md'>
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
                    <li onClick={() => setActiveTab('notifications')} className={`relative w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${activeTab === 'notifications' ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        {friendRequests?.receivedRequests.length > 0 && (
                            <span className='absolute flex items-center justify-center top-[1.3rem] text-xs left-4 w-4 h-4 bg-red rounded-full'>{friendRequests?.receivedRequests.length}</span>
                        )}
                        <IoNotificationsOutline className='text-xl' />
                        Notifications
                    </li>
                </ul>
            </div>
            {activeTab === 'users' && <UserList />}
            {activeTab === 'friends' && <FriendList />}
            {activeTab === 'notifications' && <NotificationList data={friendRequests} />}
        </div>
    )
}

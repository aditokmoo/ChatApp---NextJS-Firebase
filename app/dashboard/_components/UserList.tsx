'use client'
import useGetAllUsers from '@/hooks/useUser'
import { db } from '@/lib/firebase';
import { useUserStore } from '@/zustand/userStore';
import { arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

export default function UserList() {
    const { data, isLoading } = useGetAllUsers();
    const { currentUser } = useUserStore();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>

    const handleStartChat = async (user) => {
        const chatRef = collection(db, 'chats');
        const userChatsRef = collection(db, 'userChats');
    
        try {
            // Create a unique chat ID based on user IDs
            const chatId = currentUser?.id < user?.id
                ? `${currentUser?.id}_${user?.id}`
                : `${user?.id}_${currentUser?.id}`;
    
            const existingChatDoc = await getDoc(doc(chatRef, chatId));
    
            if (existingChatDoc.exists()) {
                // If chat already exists, navigate to it
                router.push(`/dashboard/chat`);
            } else {
                // Create a new chat
                await setDoc(doc(chatRef, chatId), {
                    createdAt: serverTimestamp(),
                    messages: []
                });
    
                // Update user data that is getting the message
                await updateDoc(doc(userChatsRef, user?.id), {
                    chats: arrayUnion({
                        chatId,
                        lastMessage: '',
                        receiverId: currentUser?.id,
                        updatedAt: Date.now()
                    })
                });
    
                // Update user that is sending the message
                await updateDoc(doc(userChatsRef, currentUser?.id), {
                    chats: arrayUnion({
                        chatId,
                        lastMessage: '',
                        receiverId: user?.id,
                        updatedAt: Date.now()
                    })
                });
    
                router.push(`/dashboard/chat`);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
            {data?.map((user) => (
                <div className="w-full flex gap-3 items-center odd:bg-dark p-4 text-white cursor-pointer hover:opacity-80" onClick={() => handleStartChat(user)}>
                    <div className="relative">
                        <Image src={user.avatar} alt="avatar" width={50} height={50} className='rounded-full' />
                        <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <span>{user.username}</span>
                        <span className='text-gray-500 text-sm'>{user.email}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

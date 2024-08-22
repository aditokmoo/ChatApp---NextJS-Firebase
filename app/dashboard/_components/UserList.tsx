'use client'
import useGetAllUsers from '@/hooks/useUser'
import { db } from '@/lib/firebase';
import { useUserStore } from '@/zustand/userStore';
import { arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TbMessageDots } from "react-icons/tb";
import { FaSearch, FaUserFriends } from 'react-icons/fa';
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from 'react-toastify';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUsers } from 'react-icons/fa6';

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

    const sendFriendRequest = async (user) => {
        const currentUserRef = doc(db, 'friendRequests', currentUser?.id);
        const recipientUserRef = doc(db, 'friendRequests', user?.id);
    
        try {
            // Check if the current user's friendRequests document exists
            const currentUserDoc = await getDoc(currentUserRef);
            if (!currentUserDoc.exists()) {
                await setDoc(currentUserRef, {
                    sentRequests: [],
                    receivedRequests: [],
                });
            }
    
            // Check if the recipient user's friendRequests document exists
            const recipientUserDoc = await getDoc(recipientUserRef);
            if (!recipientUserDoc.exists()) {
                await setDoc(recipientUserRef, {
                    sentRequests: [],
                    receivedRequests: [],
                });
            }
    
            // Add to the current user's sent requests
            await updateDoc(currentUserRef, {
                sentRequests: arrayUnion(user?.id)
            });
    
            // Add to the recipient user's received requests
            await updateDoc(recipientUserRef, {
                receivedRequests: arrayUnion(currentUser?.id)
            });
    
            toast.success("Friend request sent!");
        } catch (error) {
            console.log("Error sending friend request:", error);
        }
    };

    console.log(data)
    return (
        <div className='relative shadow-xl max-w-[500px] w-full bg-light-dark rounded-md'>
            <div className="bg-[#15182e] flex items-center w-full">
                <ul className="flex text-gray-200 text-sm items-center w-full">
                    <li className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${true ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        <FaUsers data-tip="All Users" className='text-xl' />
                        Users
                    </li>
                    <li className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${false ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
                        <FaUserFriends data-tip="All Friends" className='text-xl' />
                        Friends
                    </li>
                    <li className={`w-full text-sm flex gap-2 p-6 hover:bg-light-dark transition-all duration-200 cursor-pointer ${false ? 'bg-light-dark' : 'bg-[#15182e]'}`}>
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
                {data?.map((user) => (
                    <div className="relative w-full flex gap-3 items-center odd:bg-dark p-4 text-white cursor-pointer hover:opacity-80">
                        <div className="relative">
                            <Image src={user.avatar} alt="avatar" width={50} height={50} className='rounded-full' />
                            <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
                        </div>
                        <div className="flex flex-col">
                            <span>{user.username}</span>
                            <span className='text-gray-500 text-xs'>{user.email}</span>
                        </div>

                        <div className="absolute right-4 top-9 flex items-center gap-2">
                            <TbMessageDots className='text-gray-400 text-xl cursor-pointer' onClick={() => handleStartChat(user)} />
                            <AiOutlineUserAdd className='text-gray-400 text-xl cursor-pointer' onClick={() => sendFriendRequest(user)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

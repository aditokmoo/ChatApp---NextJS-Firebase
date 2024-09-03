import { useStartChat } from '@/hooks/useChat';
import { useUserStore } from '@/zustand/userStore';
import Image from 'next/image';
import { TbMessageDots } from 'react-icons/tb';

export default function FriendList() {
    const { currentUser } = useUserStore();
    // mutations
    const { mutate: startChat, isPending: isLoadingChat } = useStartChat();

    if (isLoadingChat) return <h2>Loading...</h2>

    console.log(currentUser)

    return currentUser.friends.map((friend) => (
        <div key={friend.id} className="relative w-full flex gap-3 items-center odd:bg-dark p-4 text-white">
            <div className="relative">
                <Image src={friend.avatar} alt="avatar" width={80} height={80} className='rounded-full' />
                <div className="absolute bottom-[4px] right-[3px] shadow-lg w-2 h-2 bg-green rounded-full"></div>
            </div>
            <div className="flex flex-col w-full">
                <span>{friend.username}</span>
                <span className='text-xs text-gray-500'>{friend.email}</span>
            </div>
            <div className="bg-[#15182e] hover:opacity-60 p-2 rounded-full">
                <TbMessageDots className='text-gray-400 text-xl cursor-pointer' onClick={() => startChat({ currentUser, friend })} />
            </div>
        </div>
    ))
}

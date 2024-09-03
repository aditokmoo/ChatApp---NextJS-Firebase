'use client'
import useGetAllUsers from '@/hooks/useUser'
import { useUserStore } from '@/zustand/userStore';
import Image from 'next/image';
import { TbMessageDots } from "react-icons/tb";
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { AiOutlineUserAdd } from "react-icons/ai";
import { LiaUserCheckSolid } from "react-icons/lia";
import { useFriendRequestAction, useGetFriendRequests } from '@/hooks/useFriendRequest';
import { MoonLoader } from 'react-spinners';
import { useStartChat } from '@/hooks/useChat';

export default function UserList() {
    const { data: allUsers, isLoading: isLoadingAllUsers } = useGetAllUsers();
    const { currentUser } = useUserStore();
    // Getting data
    const { data: friendRequests, isLoading: isLoadingFriendRequest } = useGetFriendRequests(currentUser);
    // Mutations
    const { mutate: startChat, isPending: isLoadingChat } = useStartChat();
    const { mutate: sendFriendRequest, isPending: isSendingFriendRequest } = useFriendRequestAction('send', currentUser);
    const { mutate: cancelFriendRequest, isPending: isCancelingFriendRequest } = useFriendRequestAction('cancel', currentUser);
    const { mutate: declineFriendRequest, isPending: isDecliningFriendRequest } = useFriendRequestAction('decline', currentUser);
    const { mutate: acceptFriendRequest, isPending: isAcceptingFriendRequest } = useFriendRequestAction('accept', currentUser);

    if (isLoadingAllUsers || isLoadingFriendRequest || isLoadingChat) return <div>Loading...</div>

    console.log(currentUser)

    return (
        <div className="flex flex-col w-full">
            <div className="relative p-4 flex items-center justify-center w-full flex-col">
                <FaSearch className='absolute left-[35px] text-gray-400' />
                <input type="text" placeholder='Search...' className='w-full p-4 text-sm bg-dark rounded-sm pl-12' />
            </div>
            {allUsers
                ?.sort((a, b) => (a.id === currentUser?.id ? -1 : b.id === currentUser?.id ? 1 : 0))
                .map((user) => (
                    <div key={user.id} className="relative w-full flex gap-3 items-center odd:bg-dark p-4 text-white">
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
                                {friendRequests?.receivedRequests.some(request => request.id === user.id) ? (
                                    isDecliningFriendRequest || isAcceptingFriendRequest ? (
                                        <MoonLoader size={15} color='white' />
                                    ) : (
                                        <div className="flex items-center gap-3 justify-end w-full">
                                            <div className="p-2 bg-green rounded-md cursor-pointer hover:opacity-70" onClick={() => acceptFriendRequest({ currentUser, user })}>
                                                <FaCheck className='shadow-xl' />
                                            </div>
                                            <div className="p-2 bg-[#15182e] rounded-md cursor-pointer hover:opacity-70" onClick={() => declineFriendRequest({ currentUser, user })}>
                                                <FaTimes />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        <div className="bg-[#15182e] hover:opacity-60 p-2 rounded-full">
                                            <TbMessageDots className='text-gray-400 text-xl cursor-pointer' onClick={() => startChat({ currentUser, user })} />
                                        </div>
                                        {!currentUser.friends.some(({ id }) => user.id === id) && (
                                            <div className="bg-[#15182e] hover:opacity-60 p-2 rounded-full">
                                                {isSendingFriendRequest || isCancelingFriendRequest ? (
                                                    <MoonLoader size={15} color='white' />
                                                ) : (
                                                    friendRequests?.sentRequests.some(sentRequest => sentRequest.id === user.id) ? (
                                                        <LiaUserCheckSolid className='text-gray-400 text-xl cursor-pointer' onClick={() => cancelFriendRequest({ currentUser, user })} />
                                                    ) : (
                                                        <AiOutlineUserAdd className='text-gray-400 text-xl cursor-pointer' onClick={() => sendFriendRequest({ currentUser, user })} />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                        }
                    </div >
                ))}
        </div >
    )
}

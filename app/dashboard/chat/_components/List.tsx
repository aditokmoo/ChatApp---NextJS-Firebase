'use client'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import UserInfo from './UserInfo'
import { FaUser } from 'react-icons/fa6'
import FilterList from './FilterList'
import { useUserStore } from '@/zustand/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const userData = [
    {
        id: 1,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: false,
        lastActive: '13min',
        notification: true,
    },
    {
        id: 2,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: true,
        notification: false,
    },
    {
        id: 3,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: true,
        notification: false,
    },
    {
        id: 4,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: false,
        lastActive: '1h',
        notification: false,
    },
    {
        id: 5,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: false,
        lastActive: '26min',
        notification: false,
    },
    {
        id: 6,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: true,
        notification: false,
    },
    {
        id: 7,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: true,
        notification: false,
    },
    {
        id: 8,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48',
        status: true,
        notification: false,
    }
]

export default function List() {
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userChats', currentUser.id), async (res) => {
            const items = res.data().chats;
            console.log(res)

            console.log(items)

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, 'users', item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user }
            })

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        })

        return () => unSub();
    }, [currentUser.id])

    console.log(currentUser)

    console.log(chats)

    return (
        <div className="flex flex-col w-1/3 bg-rgba-dark rounded-tr-xl rounded-br-xl h-full overflow-y-auto">
            <FilterList />
            <div className="flex relative px-6 pt-4">
                <FaSearch className='absolute top-[2.4rem] left-11 text-white' />
                <input id='search' name='search' placeholder='Search...' className='p-4 pl-12 rounded-md bg-light-dark border border-dark w-full' />
            </div>
            <div className="flex flex-col mt-6">
                {chats.map((chat) => (
                    <UserInfo key={chat.id} data={chat} />
                ))}
            </div>
        </div>
    )
}

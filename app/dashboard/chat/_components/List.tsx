import React from 'react'
import { FaSearch } from 'react-icons/fa'
import UserInfo from './UserInfo'
import { FaUser } from 'react-icons/fa6'

const userData = [
    {
        id: 1,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 2,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 3,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 4,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 5,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 6,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 7,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    },
    {
        id: 8,
        avatar: <FaUser />,
        name: 'John Doe',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
        lastMessageTime: '19:48'
    }
]

export default function List() {
    return (
        <div className="flex flex-col w-1/3 bg-rgba-dark rounded-tr-xl rounded-br-xl p-12 h-full overflow-y-auto">
            <div className="flex relative">
                <FaSearch className='absolute top-5 left-4 text-white' />
                <input id='search' name='search' placeholder='Search...' className='p-4 pl-12 rounded-md bg-light-dark border border-dark w-full' />
            </div>
            <div className="flex flex-col gap-8 mt-6">
                {userData.map((user) => (
                    <UserInfo key={user.id} data={user} />
                ))}
            </div>
        </div>
    )
}

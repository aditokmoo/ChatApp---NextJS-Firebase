'use client'

import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import SidebarLinks from "./SidebarLinks";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";

export default function Sidebar() {
    const { currentUser, isLoading } = useUserStore();

    if (isLoading) return <h2>Loading...</h2>

    console.log(currentUser)

    return (
        <nav className="bg-[#0c0d14] shadow-2xl px-2 py-8 h-full">
            <div className="flex flex-col gap-4 w-full text-white items-center justify-between h-full">
                <div className="flex flex-col gap-24 items-center">
                    <IoChatbubblesOutline className="text-[2.5rem]" />
                    <SidebarLinks />
                </div>
                <Link href='/dashboard/profile' className="text-2xl">
                    <Image src={currentUser?.avatar} alt="profile" width={50} height={50} className="rounded-full" />
                </Link>
            </div>
        </nav>
    )
}

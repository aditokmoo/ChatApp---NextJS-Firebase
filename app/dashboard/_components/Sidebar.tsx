import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import SidebarLinks from "./SidebarLinks";
import { IoChatbubblesOutline } from "react-icons/io5";
export default function Sidebar() {
    return (
        <nav className="bg-[#0c0d14] shadow-2xl px-2 py-8 h-full">
            <div className="flex flex-col gap-4 w-full text-white items-center justify-between h-full">
                <div className="flex flex-col gap-24 items-center">
                    <IoChatbubblesOutline className="text-[2.5rem]" />
                    <SidebarLinks />
                </div>
                <Link href='/dashboard/profile' className="text-2xl"><FaCircleUser /></Link>
            </div>
        </nav>
    )
}

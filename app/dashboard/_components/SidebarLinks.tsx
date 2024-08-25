'use client'
import Link from 'next/link'
import { AiFillHome } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdSettings } from "react-icons/md";
import { usePathname } from 'next/navigation';

export default function SidebarLinks() {
    const pathname = usePathname();
    return (
        <ul className="flex flex-col gap-4 text-xl">
            <Link href='/dashboard' className={`p-5 hover:bg-rgba-dark transition-all duration-300 rounded-xl ${pathname === '/dashboard' && 'bg-primary'}`}><AiFillHome /></Link>
            <Link href='/dashboard/chat' className={`p-5 hover:bg-rgba-dark transition-all duration-300 rounded-xl ${pathname === '/dashboard/chat' && 'bg-primary'}`}><TbMessageCircle2Filled /></Link>
            <Link href='/dashboard/settings' className={`p-5 hover:bg-rgba-dark transition-all duration-300 rounded-xl ${pathname === '/dashboard/settings' && 'bg-primary'}`}><MdSettings /></Link>
        </ul>
    )
}

import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import SidebarLinks from "./SidebarLinks";
export default function Sidebar() {
    return (
        <nav className="bg-light-dark px-4 py-8 h-full w-24 rounded-tl-xl rounded-bl-xl">
            <div className="flex flex-col gap-4 w-full text-white items-center justify-between h-full">
                <div className="flex flex-col gap-24 items-center">
                    <h2>ChatApp</h2>
                    <SidebarLinks />
                </div>
                <Link href='#' className="text-2xl"><FaCircleUser /></Link>
            </div>
        </nav>
    )
}

'use client'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export default function ProfilePage() {
    return (
        <main className="w-full">
            <button className='text-white' onClick={() => signOut(auth)}>Logout</button>
        </main>
    )
}

'use client'
import Sidebar from './_components/Sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserStore } from '@/zustand/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const { currentUser, isLoading } = useUserStore();

    if (isLoading || (!isLoading && !currentUser)) {
        return <h2>Loading...</h2>
    }

    return (
        <main className='h-full flex justify-between'>
            <Sidebar />
            {children}
        </main>
    );
}

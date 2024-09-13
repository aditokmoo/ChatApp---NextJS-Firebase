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
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            console.log(user)
            fetchUserInfo(user?.uid);
        })

        return () => unSub()
    }, [fetchUserInfo])

    
    if(isLoading) return <h2>loading....</h2>

    if(!currentUser) return router.push('/auth/login')

    return (
        <main className='h-full flex justify-between'>
            <Sidebar />
            {children}
        </main>
    );
}

'use client'
import useCurrentUser from '@/hooks/useCurrentUser';
import Sidebar from './_components/Sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: user, isLoading } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login');
        }
    }, [isLoading, user, router]);
    
    if (isLoading || (!isLoading && !user)) {
        return <h2>Loading...</h2>
    }

    return (
        <main className='h-full flex justify-between'>
            <Sidebar />
            {children}
        </main>
    );
}

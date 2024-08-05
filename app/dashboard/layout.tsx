import React from 'react'
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='h-full flex justify-between'>
            <Sidebar />
            {children}
        </main>
    )
}

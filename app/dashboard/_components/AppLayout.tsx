'use client'
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/zustand/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            console.log(user)
            fetchUserInfo(user?.uid);
        })

        return () => unSub()
    }, [fetchUserInfo])

    useEffect(() => {
        if (!currentUser) {
            router.push('/auth/login');
        } else {
            router.push('/dashboard')
        }
    }, [isLoading, currentUser]);

    return (
        <>
            {children}
        </>
    )
}

'use client'

import { auth } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

export default function useCurrentUser() {
    const { data, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => {
            return new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    resolve(user);
                });
                return () => unsubscribe();
            });
        }
    })

    return { data, isLoading }
}
'use client'
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

export default function useGetAllUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['getAllUsers'],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const users: any[] | PromiseLike<any[]> = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            return users;
        }
    })

    return { data, isLoading }
}
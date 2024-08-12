'use client'
import { auth, db } from "@/lib/firebase";
import upload from "@/lib/upload";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface RegisterDataType {
    username: string,
    email: string,
    password: string,
    avatar: File[],
}

interface LoginDataType {
    email: string,
    password: string
}

export default function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    const createAccount = async (data: RegisterDataType) => {
        const { username, email, password, avatar } = data;

        setIsLoading(true);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar, (progress) => {
                setProgress(progress);
            });

            
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: response.user.uid,
                blocked: [],
            });
            
            await setDoc(doc(db, "userChats", response.user.uid), {
                chats: [],
            });
            
            toast.success('Account has been created!');
            router.push('/auth/login');
        } catch (error) {
            if (error instanceof Error && error.message === 'Firebase: Error (auth/email-already-in-use).') {
                toast.error('Email already in use!');
            } else {
                toast.error(error instanceof Error && error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (data: LoginDataType) => {
        const { email, password } = data;

        setIsLoading(false);

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            console.log(response)

            toast.success('Successfully logged in!');
            router.push('/dashboard')
        } catch (error) {
            if(error instanceof Error && error.message === 'Firebase: Error (auth/invalid-credential).') {
                toast.error('Wrong credentials!')
            } else {
                toast.error(error instanceof Error && error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    return { createAccount, login, progress, isLoading };
}

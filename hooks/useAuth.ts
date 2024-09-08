'use client'

import { createAccount, login } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
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

// Login hook for handling login service
export function useLogin() {
    const router = useRouter();
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (loginData: LoginDataType) => login(loginData),
        onSuccess: (result) => {
            router.push('/dashboard')
            console.log('Login: ', result)
        },
        onError: (error) => {
            if (error instanceof Error && error.message === 'Firebase: Error (auth/email-already-in-use).') {
                toast.error('Email already in use!');
            } else {
                toast.error(error instanceof Error && error.message);
            }
        }
    })

    return mutation;
}

// Register hook for handling create account service
export function useCreateAccount() {
    const router = useRouter();
    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: (registerData: RegisterDataType) => createAccount(registerData),
        onSuccess: (result) => {
            router.push('/auth/login');
            console.log('Register: ', result);
        },
        onError: (error) => {
            if (error instanceof Error && error.message === 'Firebase: Error (auth/invalid-credential).') {
                toast.error('Wrong credentials!');
            } else {
                toast.error(error instanceof Error && error.message);
            }
        }
    });

    return mutation;
}
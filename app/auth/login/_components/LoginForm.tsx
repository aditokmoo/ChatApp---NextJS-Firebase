'use client'

import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

interface LoginDataType {
    email: string,
    password: string
}

export default function LoginForm() {
    const { mutate: login, isPending: isLoadingAuth } = useLogin();
    const { register, handleSubmit } = useForm();
    if(isLoadingAuth) return <h2>Loading...</h2>
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => {
            login(data as LoginDataType)
        })}>
            <input {...register('email', { required: 'Email is required' })} type="text" placeholder="Email..." id="email" name="email" className="p-4 text-sm bg-dark rounded-sm" />
            <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
            <button className="bg-primary p-2 rounded-sm font-semibold text-white">Login</button>
        </form>
    )
}

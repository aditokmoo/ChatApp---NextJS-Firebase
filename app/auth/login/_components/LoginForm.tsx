'use client'

import useAuth from "@/hooks/useAuth"
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const { login } = useAuth();
    const { register, handleSubmit } = useForm();
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => {
            login(data as any)
        })}>
            <input {...register('email', { required: 'Email is required' })} type="text" placeholder="Email..." id="email" name="email" className="p-4 text-sm bg-dark rounded-sm" />
            <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
            <button className="bg-primary p-2 rounded-sm font-semibold text-white">Login</button>
        </form>
    )
}

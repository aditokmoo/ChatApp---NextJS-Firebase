'use client'
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import noImageUser from '@/assets/no-image-user-avatar.png'
import Image from 'next/image';
import { useState } from 'react';

interface AvatarState {
    file: File | null;
    imageUrl: string;
}

export default function RegisterForm() {
    const [avatar, setAvatar] = useState<AvatarState>({
        file: null,
        imageUrl: ''
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createAccount } = useAuth();

    console.log(errors)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar({
                file: file,
                imageUrl: URL.createObjectURL(file)
            });
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => {
            createAccount(data as any)
            reset();
        })}>
            <label htmlFor="avatar">
                <Image src={avatar.imageUrl ? avatar.imageUrl : noImageUser} alt="user" width={70} height={70} className='rounded-full mx-auto hover:opacity-80 cursor-pointer' />
                <input type="file" id="avatar" className='hidden'
                    {...register('avatar', { onChange: handleFileChange })}
                />
            </label>
            <input {...register('username', { required: 'Username is required' })} type="text" placeholder="Username..." id="username" name="username" className="p-4 text-sm bg-dark rounded-sm" />
            <input {...register('email', { required: 'Email is required' })} type="text" placeholder="Email..." id="email" name="email" className="p-4 text-sm bg-dark rounded-sm" />
            <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
            <button className="bg-primary p-2 rounded-sm font-semibold text-white">Create account</button>
        </form>
    )
}

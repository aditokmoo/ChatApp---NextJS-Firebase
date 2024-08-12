import Link from "next/link";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
    return (
        <div className="max-w-96 w-full mx-auto h-full flex flex-col gap-4 justify-center">
            <h2 className="text-center text-white text-2xl">Login</h2>
            <LoginForm />
            <p className="text-center text-gray-400">You don't have account? <Link href='/auth/register' className="text-primary underline">Create account</Link></p>
        </div>
    )
}

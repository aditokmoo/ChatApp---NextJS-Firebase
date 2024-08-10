import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="max-w-96 w-full mx-auto h-full flex flex-col gap-4 justify-center">
            <h2 className="text-center text-white text-2xl">Create account</h2>
            <RegisterForm />
            <p className="text-center text-gray-400">Already have account? <Link href='/auth/login' className="text-primary underline">Login</Link></p>
        </div>
    )
}

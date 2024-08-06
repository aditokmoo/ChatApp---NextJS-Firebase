import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="max-w-96 w-full mx-auto h-full flex flex-col gap-4 justify-center">
            <h2 className="text-center text-white text-2xl">Login</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Email..." id="email" name="email" className="p-4 text-sm bg-dark rounded-sm" />
                <input type="password" placeholder="Password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
                <button className="bg-primary p-2 rounded-sm font-semibold text-white">Login</button>
            </form>
            <p className="text-center text-gray-400">You don't have account? <Link href='/auth/register' className="text-primary underline">Create account</Link></p>
        </div>
    )
}

import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="max-w-96 w-full mx-auto h-full flex flex-col gap-4 justify-center">
            <h2 className="text-center text-white text-2xl">Create account</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Email..." id="email" name="email" className="p-4 text-sm bg-dark rounded-sm" />
                <input type="password" placeholder="Password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
                <input type="password" placeholder="Confirm password..." id="password" name="password" className="p-4 text-sm bg-dark rounded-sm" />
                <button className="bg-primary p-2 rounded-sm font-semibold text-white">Create account</button>
            </form>
            <p className="text-center text-gray-400">Already have account? <Link href='/auth/login' className="text-primary underline">Login</Link></p>
        </div>
    )
}

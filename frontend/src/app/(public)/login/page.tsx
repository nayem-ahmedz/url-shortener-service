'use client';
import Link from "next/link";

export default function Login() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void  => {
        e.preventDefault();
        console.log('clicked');
    }
    return (
        <div className="hero min-h-[70vh]">
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center lg:text-left gap-0">
                    <h1 className="text-5xl font-bold text-nowrap">Welcome Back</h1>
                    <p className="py-6 max-w-md">
                        Log in to access your dashboard, manage your URLs, and track clicks effortlessly.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input w-full" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" className="input w-full" placeholder="Password" />
                                <button type='submit' className="btn btn-primary mt-4">Login</button>
                            </fieldset>
                            <p className="mt-3 text-center">
                                Dont have a account? <Link href='/register'>Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
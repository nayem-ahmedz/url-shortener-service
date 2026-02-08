import type { Metadata } from "next";
import LoginForm from "@/components/ui/auth/LoginForm";

export const metadata: Metadata = {
    title: 'Login'
}

export default function Login() {
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
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
import type { Metadata } from "next";
import RegisterForm from "@/components/ui/auth/RegisterForm";

export const metadata: Metadata = {
    title: 'Register'
}

export default function Register() {
    return (
        <div className="hero min-h-[70vh]">
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center lg:text-left gap-0">
                    <h1 className="text-3xl md:text-5xl/tight font-bold">Create <br /> Your account</h1>
                    <p className="py-6 max-w-md">
                        Join our URL Shortener platform and manage up to 100 links for free. Track clicks and optimize your sharing like a pro.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
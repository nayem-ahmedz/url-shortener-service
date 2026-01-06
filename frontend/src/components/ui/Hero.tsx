import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero min-h-[80vh]">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold">Make your long links <span className="text-primary">Shorter</span></h1>
                    <p className="py-6 text-lg opacity-70">
                        The professional way to manage, track, and optimize your URLs.
                        Get detailed analytics and free up to 100 links
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register" className="btn btn-primary">
                            Get Started
                        </Link>
                        <Link href="/login" className="btn btn-outline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
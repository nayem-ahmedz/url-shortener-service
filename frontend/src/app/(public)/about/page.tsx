import type { Metadata } from 'next'

import {
    FiZap,
    FiLock,
    FiBarChart2,
    FiDatabase,
    FiShield,
    FiLink,
    FiTrendingUp
} from "react-icons/fi";

export const metadata: Metadata = {
    title: 'About'
}

export default function About() {
    const features = [
        {
            icon: <FiZap />,
            title: "Instant Shortening",
            desc: "Generate clean 6-8 character short URLs instantly with high performance."
        },
        {
            icon: <FiLock />,
            title: "Secure Authentication",
            desc: "JWT-based auth with HttpOnly cookies to protect user sessions."
        },
        {
            icon: <FiBarChart2 />,
            title: "Click Analytics",
            desc: "Track total clicks and performance insights for every short link."
        },
        {
            icon: <FiShield />,
            title: "Usage Protection",
            desc: "Free-tier limits to prevent abuse and ensure system stability."
        }
    ];

    const techStack = [
        "Next.js",
        "TypeScript",
        "Express.js",
        "MySQL",
        "Tailwind CSS",
        "DaisyUI"
    ];

    return (
        <section className="min-h-[80vh] py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        About <span className="text-primary">This Project</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        A modern URL shortening and management platform focused on speed,
                        security, and real-world usability.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-2">
                                <FiLink className="text-3xl text-primary" />
                                <h2 className="card-title text-2xl">Project Goal</h2>
                            </div>
                            <p className="text-base-content/70">
                                To simplify long and complex URLs into short, shareable links
                                while giving users full ownership and insight into their data.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-2">
                                <FiTrendingUp className="text-3xl text-primary" />
                                <h2 className="card-title text-2xl">Vision</h2>
                            </div>
                            <p className="text-base-content/70">
                                To grow into a reliable link management platform with analytics,
                                scalability, and production-ready architecture.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Core Features
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((item, idx) => (
                            <div
                                key={idx}
                                className="card bg-base-200 shadow hover:shadow-xl transition"
                            >
                                <div className="card-body items-center text-center">
                                    <div className="text-4xl text-secondary mb-3">
                                        {item.icon}
                                    </div>
                                    <h3 className="card-title">{item.title}</h3>
                                    <p className="text-sm text-base-content/70">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-3xl justify-center mb-6 flex items-center gap-2">
                            <FiDatabase /> Technology Stack
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="badge badge-lg badge-outline"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quality Note */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Built with Professional Standards
                    </h2>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Designed with clean architecture, structured APIs, and scalable
                        backend logic — suitable for real-world production use and future
                        expansion.
                    </p>
                </div>

            </div>
        </section>
    );
}
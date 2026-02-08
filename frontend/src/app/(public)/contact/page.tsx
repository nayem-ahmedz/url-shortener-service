import ContactForm from '@/components/ui/contact/ContactForm';
import type { Metadata } from 'next'
import { FiMail, FiGlobe } from "react-icons/fi";

export const metadata: Metadata = {
    title: 'Contact'
}

export default function Contact() {
    return (
        <section className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Contact <span className="text-primary">Us</span>
                    </h1>
                    <p className="mx-auto max-w-md text-base-content/70">
                        Have questions, feedback, or feature ideas?
                        We'd love to hear from you.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <FiMail className="text-3xl text-primary" />
                                    <div>
                                        <h3 className="text-xl font-semibold">Email</h3>
                                        <p className="text-base-content/70">
                                            support@urlshortener.dev
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <FiGlobe className="text-3xl text-primary" />
                                    <div>
                                        <h3 className="text-xl font-semibold">Platform</h3>
                                        <p className="text-base-content/70">
                                            URL Shortener · v1.0
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <p className="text-base-content/70 italic">
                                    Built with scalability and security in mind.
                                    Your feedback helps shape future features.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Send a Message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
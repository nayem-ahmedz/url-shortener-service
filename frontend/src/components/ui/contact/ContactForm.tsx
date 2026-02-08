'use client';
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success("Feature coming soon 🚀");
        e.currentTarget.reset();
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="label">
                    <span className="label-text flex items-center gap-2 font-semibold">
                        <FiUser className="text-primary" /> Full Name
                    </span>
                </label>
                <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div>
                <label className="label">
                    <span className="label-text flex items-center gap-2 font-semibold">
                        <FiMail className="text-primary" /> Email Address
                    </span>
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div>
                <label className="label">
                    <span className="label-text flex items-center gap-2 font-semibold">
                        <FiMessageSquare className="text-primary" /> Message
                    </span>
                </label>
                <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    className="textarea textarea-bordered w-full"
                    required
                />
            </div>

            <button className="btn btn-primary w-full gap-2 text-lg">
                <FiSend />
                Send Message
            </button>
        </form>
    );
}
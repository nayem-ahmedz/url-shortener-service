import type { Metadata } from "next";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export const metadata: Metadata = {
    title: {
        template: '%s | Dashboard - URL Shortener',
        default: 'Dashboard Home - URL Shortener',
    },
    description: "Dashboard for URL Shortener service, from where a user can create, manage, and track shortened URLs.",
};

export default function DashboardRoot({ children }: { children: React.ReactNode }) {
    return (
        <main className="containerr2">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <FaBars />
                        </label>
                        <div className="px-4 grow">User Dashboard</div>
                        <div>
                            <Link href='/' className="btn btn-secondary btn-outline">Exit Dashboard</Link>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">
                        {
                            children
                        }
                    </div>
                </div>
                <Sidebar />
            </div>
        </main>
    );
}
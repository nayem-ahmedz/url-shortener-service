'use client';
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

export default function PublicRoot({ children }: { children: React.ReactNode }) {
    const { currentUser } = useAuth();
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

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base mb-4">
                                <div className="avatar justify-center cursor-default hover:bg-transparent">
                                    <div className="w-6 is-drawer-open:w-20 rounded">
                                        <Image src='/avatar.png' alt='placeholder avatar' width={200} height={200} />
                                    </div>
                                </div>
                                <div className="is-drawer-close:hidden flex flex-col gap-0 cursor-default hover:bg-transparent">
                                    <h2 className="text-2xl">{currentUser?.name}</h2>
                                    <p>User</p>
                                </div>
                            </li>
                            <li>
                                <Link href='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base" data-tip="Homepage">
                                    <RiDashboardFill />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
'use client';
import { useAuth } from "@/context/AuthContext";
import { navLinkT } from "@/types/navLinkT";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Header() {
    const navLinks: navLinkT[] = [
        { id: 1, text: 'Home', url: '/' },
        { id: 2, text: 'About', url: '/about' },
        { id: 3, text: 'Contact', url: '/contact' },
        { id: 4, text: 'Register', url: '/register' },
        { id: 5, text: 'Dashboard', url: '/dashboard' }
    ];
    const { loading, currentUser, logout } = useAuth();
    const handleLogout = async (): Promise<void> => {
        const result = await Swal.fire({
            title: "Ready to logout?",
            text: "You will need to login again!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        });

        if (result.isConfirmed) {
            try {
                await logout();
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while logging out.",
                    icon: "error"
                });
            }
        }
    };
    return (
        <header className="bg-base-100 shadow-sm">
            <div className="navbar containerr">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navLinks.map(link => <li key={link.id}>
                                    <Link href={link.url} className="text-base"> {link.text} </Link>
                                </li>)
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">URL shortner</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks.map(link => <li key={link.id}>
                                <Link href={link.url} className="text-base"> {link.text} </Link>
                            </li>)
                        }
                    </ul>
                </div>
                <div className="navbar-end pr-2">
                    {
                        // loading status on auth fething, if user show profile menue else show login
                        loading ? <span className="loading loading-dots loading-xl"></span> :
                            currentUser
                                ? <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={-1}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><Link href='/dashboard'>Dashboard</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div> : <Link href='/login' className="text-base btn btn-primary btn-outline">
                                    Login
                                </Link>
                    }
                </div>
            </div>
        </header>
    );
}
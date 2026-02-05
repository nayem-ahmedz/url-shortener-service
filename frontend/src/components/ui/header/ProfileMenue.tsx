'use client';
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import useUser from "@/hooks/useUser";

export default function ProfileMenue() {
    const { currentUser } = useUser();
    return (
        <div className="navbar-end pr-2">
            {
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
                            <li><Link className="text-base" href='/dashboard'>Dashboard</Link></li>
                            <li><LogoutButton /></li>
                        </ul>
                    </div> : <Link href='/login' className="text-base btn btn-primary btn-outline">
                        Login
                    </Link>
            }
        </div>
    );
}
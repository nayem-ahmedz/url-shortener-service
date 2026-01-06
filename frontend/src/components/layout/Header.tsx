import { navLinkT } from "@/types/navLinkT";
import Link from "next/link";

export default function Header() {
    const navLinks: navLinkT[] = [
        { id: 1, text: 'Home', url: '/' },
        { id: 2, text: 'About', url: '/about' },
        { id: 3, text: 'Contact', url: '/contact' },
        { id: 4, text: 'Register', url: '/register' }
    ];
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
                <div className="navbar-end">
                    <Link href='/login' className="text-base btn btn-primary btn-outline">Login</Link>
                </div>
            </div>
        </header>
    );
}
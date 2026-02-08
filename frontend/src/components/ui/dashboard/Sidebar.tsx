import { RiLogoutBoxLine } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import LogoutButton from "../auth/LogoutButton";
import Link from "next/link";
import UserProfile from "./UserProfile";

export default function Sidebar() {
    return (
        <div className="drawer-side is-drawer-close:overflow-visible">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                {/* Sidebar content here */}
                <ul className="menu w-full grow">
                    <UserProfile />
                    <li>
                        <Link href='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base" data-tip="Homepage">
                            <RiDashboardFill />
                            <span className="is-drawer-close:hidden">Homepage</span>
                        </Link>
                    </li>
                    <li>
                        <div className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base" data-tip='Logout'>
                            <RiLogoutBoxLine />
                            <div className="is-drawer-close:hidden"><LogoutButton /></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
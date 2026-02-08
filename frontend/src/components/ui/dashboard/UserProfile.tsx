'use client';
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function UserProfile() {
    const { currentUser } = useUser();
    return (
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
    );
}
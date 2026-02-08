'use client';
import { User } from "@/types/user.type";
import { useState } from "react";
import { UserContext } from "./UserContext";

interface PropsType {
    children: React.ReactNode,
    initialUser: User | null
}

export interface LogoutResponseT {
    status: boolean;
    message?: unknown;
}

export default function UserProvider({ children, initialUser }: PropsType) {
    const [currentUser, setCurrentUser] = useState(initialUser);

    const logout = async (): Promise<LogoutResponseT> => {
        const res = await fetch("/api/logout", {
            method: 'POST'
        });
        const data = await res.json();
        if(res.ok || res.status === 401){
            setCurrentUser(null);
        }
        return data;
    };

    return (
        <UserContext value={{ currentUser, setCurrentUser, logout }}>
            {
                children
            }
        </UserContext>
    );
}
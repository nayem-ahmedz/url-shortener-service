'use client';
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user.type";
import { useState } from "react";
import { UserContext } from "./UserContext";

interface PropsType{
    children: React.ReactNode,
    initialUser: User | null
}

export default function UserProvider({ children, initialUser }: PropsType) {
    const [currentUser, setCurrentUser] = useState(initialUser);

    const logout = async () => {
        await axiosInstance.post("/api/auth/logout");
        setCurrentUser(null);
    };

    return (
        <UserContext value={{ currentUser, setCurrentUser, logout }}>
            {
                children
            }
        </UserContext>
    );
}
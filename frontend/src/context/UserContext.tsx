'use client';
import { User } from "@/types/user.type";
import { createContext } from "react";
import { LogoutResponseT } from "./UserProvider";

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    logout: () => Promise<LogoutResponseT>;
}

export const UserContext = createContext<UserContextType | null>(null);
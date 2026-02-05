'use client';
import { User } from "@/types/user.type";
import { createContext } from "react";

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
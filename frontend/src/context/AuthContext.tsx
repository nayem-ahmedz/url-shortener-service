'use client';
import { axiosInstance } from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    setCurrentUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function to get Authenticated user, and auth function
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Restore login from cookie
    useEffect(() => {
        const fetchUser = async () => {
            // This cookie is visible to JS
            const hasHint = document.cookie.includes('isRegisterred');
            if (!hasHint) {
                setCurrentUser(null);
                setLoading(false);
                return;
            }
            try {
                const res = await axiosInstance.get("/api/auth/me");
                if (res.data.status) {
                    setCurrentUser(res.data.user);
                }
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setCurrentUser(null);
                    // CLEANUP exired cookies
                    document.cookie = "isRegisterred=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        await axiosInstance.post("/api/auth/logout");
        setCurrentUser(null);
    };

    return (
        <AuthContext value={{ currentUser, setCurrentUser, loading, logout }}>
            {
                children
            }
        </AuthContext>
    );
}
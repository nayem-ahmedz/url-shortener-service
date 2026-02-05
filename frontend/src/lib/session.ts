import { User } from "@/types/user.type";
import { cookies } from "next/headers";
import { axiosInstance } from "./axios";

export default async function getSession(): Promise<User | null>{
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if(!token) return null;

    try{
        const res = await axiosInstance.get("/api/auth/me", {
            headers: {
                Cookie: `token=${token.value}` // mannually attaching token (as this is server action, not from browser thus withCred wont work)
            }
        });
        if(res.data.status){
            return res.data.user;
        }
        return null;
    } catch(err){
        console.error('failed to fetch user', err);
        return null;
    }
}
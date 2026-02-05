import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function useUser() {
    const context = useContext(UserContext);
    if(!context){
        // console.error('context not found'); // console.error wont remove ts flag, through error
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
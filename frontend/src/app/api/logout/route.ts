import axiosSecure from "@/lib/axiosSecure";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const axios = await axiosSecure();
    try {
        const response = await axios.post('/api/auth/logout')
        console.log('response', response.data);
        // delete cookie
        cookieStore.delete('token');

        // success response
        return Response.json({
            status: true, message: response.data.message || 'Logout succesfull'
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            status: false, message: 'Internal Server Error / Backend Unreachable'
        }, { status: 500 })
    }
}
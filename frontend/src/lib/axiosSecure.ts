import axios from "axios";
import { cookies } from "next/headers";

export default async function axiosSecure() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value;
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return axiosInstance;
}
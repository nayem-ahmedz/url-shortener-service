import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        const response = await fetch(`${process.env.API_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value}`
            }
        });
        const statusCode = response.status;
        const data = await response.json();
        console.log('data after logut', data, response.ok);
        if (!response.ok) {
            return Response.json({
                status: false, message: data.message || 'Logout failed'
            }, { status: statusCode })
        }
        // delete cookie
        cookieStore.delete('token');

        // success response
        return Response.json({
            status: true, message: data.message || 'Logout succesfull'
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            status: false, message: 'Internal Server Error / Backend Unreachable'
        }, { status: 500 })
    }
}
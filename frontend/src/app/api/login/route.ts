import { cookies } from "next/headers";

export async function POST(request: Request) {
    let body;
    // extract json body
    try {
        body = await request.json();
    } catch (err) {
        return Response.json({
            status: false, message: 'Empty body/payload'
        }, { status: 400 })
    }
    // check email and password
    const email = body.email;
    const password = body.password;
    if (!email || !password) {
        return Response.json({
            status: false, message: 'Missing credentials'
        }, { status: 400 })
    }

    // pass to express backend
    try {
        const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const statusCode = response.status;
        const data = await response.json();
        if (!response.ok) {
            return Response.json({
                status: false, message: data.message || 'Authentication failed'
            }, { status: statusCode })
        }
        // setting up httpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day in seconds
        });

        // success response
        return Response.json({
            status: true, message: data.message || 'Login succesfull', data: data.user
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            status: false, message: 'Internal Server Error / Backend Unreachable'
        }, { status: 500 })
    }
}
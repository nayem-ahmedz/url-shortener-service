import axiosSecure from "@/lib/axiosSecure";

export async function POST(request: Request) {
    const axios = await axiosSecure();
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
    const longUrl = body.longUrl;
    if (!longUrl) {
        return Response.json({
            status: false, message: 'Missing Long URL'
        }, { status: 400 })
    }

    // pass to express backend
    try {
        const response = await axios.post('/api/url', { longUrl });
        console.log('response', response.data);

        // success response
        return Response.json(
            response.data, { status: 200 })
    } catch (error) {
        return Response.json({
            status: false, message: 'Internal Server Error / Backend Unreachable'
        }, { status: 500 })
    }
}
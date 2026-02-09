import axiosSecure from "@/lib/axiosSecure";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const axios = await axiosSecure();
    const { id } = await params;
    console.log(id);

    if(!id){
        return Response.json({
            status: false, message: 'Invalid link ID'
        }, { status: 400 })
    }

    // pass to express backend
    try {
        const response = await axios.delete(`/api/url/${id}`);
        revalidatePath('/dashboard');
        // success response
        return Response.json(
            response.data, { status: 200 })
    } catch (error) {
        return Response.json({
            status: false, message: 'Internal Server Error / Backend Unreachable'
        }, { status: 500 })
    }
}
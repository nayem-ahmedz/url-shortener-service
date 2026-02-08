import axiosSecure from "@/lib/axiosSecure";
import { linkT } from "@/types/linkT";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

export default async function UrlList({ initialLinks }: { initialLinks: linkT[] }) {
    const axios = await axiosSecure();
    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This short URL will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it',
        });
        if (!result.isConfirmed) return;
        try {
            await axios.delete(`/api/urls/delete/${id}`);
            toast.success('Link deleted successfully');
        } catch (err) {
            toast.error('Failed to delete link');
            console.error('Delete error:', err);
        }
    };
    return (
        <tbody>
            {
                initialLinks.map((link, index) => <tr key={link.id}>
                    <th>{index + 1}</th>
                    <th>
                        {
                            link.long_url.length > 50 ? link.long_url.slice(0, 40) + '...' : link.long_url
                        }
                    </th>
                    <th>{link.short_code}</th>
                    <th>
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'website_link'}/${link.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            {`${process.env.NEXT_PUBLIC_API_URL || 'website_link'}/${link.short_code}`}
                        </a>
                    </th>
                    <th className='text-center'>{link.clicks}</th>
                    <th>{new Date(link.created_at).toLocaleString()}</th>
                    <th>
                        <button onClick={() => handleDelete(link.id)} className='btn btn-error btn-outline flex gap-2 items-center'><FaTrash /> Delete</button>
                    </th>
                </tr>)
            }
        </tbody>
    );
}
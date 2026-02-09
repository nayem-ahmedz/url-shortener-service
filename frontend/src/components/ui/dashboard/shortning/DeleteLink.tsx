'use client';
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function DeleteLink({ id }: { id: number }) {
    const router = useRouter();
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
            const response = await fetch(`/api/url/delete/${id}`, { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
                return;
            }
            router.refresh();
            toast.success('Link deleted successfully');
        } catch (err) {
            toast.error('Failed to delete link');
            console.error('Delete error:', err);
        }
    };
    return (
        <button onClick={() => handleDelete(id)} className='btn btn-error btn-outline flex gap-2 items-center'><FaTrash /> Delete</button>
    );
}
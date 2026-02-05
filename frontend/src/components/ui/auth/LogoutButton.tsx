import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LogoutButton() {
    const { logout } = useUser();
    const router = useRouter();
    const handleLogout = async (): Promise<void> => {
        const result = await Swal.fire({
            title: "Ready to logout?",
            text: "You will need to login again!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        });

        if (result.isConfirmed) {
            try {
                await logout();
                router.refresh();
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success"
                });
                router.replace('/');
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while logging out.",
                    icon: "error"
                });
            }
        }
    };
    return (
        <button className="text-base" onClick={handleLogout}>Logout</button>
    );
}
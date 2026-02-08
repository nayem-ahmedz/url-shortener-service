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
                const result = await logout();
                if (result.status) {
                    router.refresh();
                    Swal.fire({
                        title: "Logged Out!",
                        text: "You have been logged out successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    router.replace('/');
                } else{
                    Swal.fire({
                        title: "Failed to Log Out!",
                        text: "internal server issue.",
                        icon: "error",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
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
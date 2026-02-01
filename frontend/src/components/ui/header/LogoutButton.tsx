import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function LogoutButton() {
    const { logout } = useAuth();
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
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success"
                });
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
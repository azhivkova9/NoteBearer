import { useContext } from "react";
import LogoutForm from "../../components/auth/LogoutForm/LogoutForm";
import { AppContext } from "../../store/app-context";

export default function LogoutPage() {
    const { userData } = useContext(AppContext);

    return (
        <>
            {userData ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <LogoutForm />
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                </div>
            )}
        </>
    );
}
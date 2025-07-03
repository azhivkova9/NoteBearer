import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase-config";
import { useState } from "react";
import Modal from "../../UI/Modal/Modal";

export default function LogoutForm() {
    const navigate = useNavigate();
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error('Error logging out:', error);
            setModalMessage(`We could not log you out. Please try again later!`);
            setShowModal(true);
        }
    };

    const handleClose = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center justify-center w-150 h-60 bg-opacity-50 transform-3d bg-gradient-to-t from-orange-100 to-green-200 shadow-2xl backdrop-blur-lg border-2 border-green-400 pb-2 rounded-lg">
            <p className="text-2xl font-bold text-center mb-10 text-green-900">Are you sure you want to logout?</p>
            <div className="flex flex-row justify-between gap-4">
                <button onClick={handleLogout} className='mt-6 px-8 py-2 font-bold bg-orange-200 rounded text-green-900 cursor-pointer border-2 border-orange-400 shadow-lg hover:text-slate-900 hover:font-bold'>Yes</button>
                <button onClick={handleClose} className='mt-6 px-8 py-2 font-bold bg-orange-200 rounded text-green-900 cursor-pointer border-2 border-orange-400 shadow-lg hover:text-slate-900 hover:font-bold'>No</button>
            </div>
            <Modal show={showModal} handleClose={() => setShowModal(false)} message={modalMessage} />
        </div>
    );
}
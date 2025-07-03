import { useContext } from "react";
import { AppContext } from "../../store/app-context";

export default function Account() {
    const { userData } = useContext(AppContext);

    return (
        <div className="text-center flex flex-col items-center justify-center min-w-2xl w-full h-full m-auto">
        { userData ? (
            <div className="container p-4 text-center bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-8 border-b-2 border-green-300 pb-2">My profile</h1>
                <div>
                    <p className="mb-2"><strong>Profile Picture:</strong> {userData?.profilePicture ? <img src={userData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto" /> : "N/A"}</p>
                    <p className="mb-2"><strong>Username:</strong> {userData?.username ?? "N/A"}</p>
                    <p className="mb-2"><strong>First Name:</strong> {userData?.firstName ?? "N/A"}</p>
                    <p className="mb-2"><strong>Last Name:</strong> {userData?.lastName ?? "N/A"}</p>
                    <p className="mb-2"><strong>Location:</strong> {userData?.location ?? "N/A"}</p>
                    <p className="mb-2"><strong>Email:</strong> {userData?.email ?? "N/A"}</p>
                    <p className="mb-2"><strong>Bio:</strong> {userData?.bio ?? "N/A"}</p>
                    <p className="mb-2"><strong>Joined on: </strong> {userData?.createdOn ? new Date(userData.createdOn).toLocaleDateString() : "N/A"}</p>
                </div>
            </div>
        ) : (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
        )}
        </div>
    );
}
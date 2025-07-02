import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react"
import Modal from "../../UI/Modal/Modal";
import { AppContext } from "../../../store/app-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
    const { setAppState } = useContext(AppContext);
    const navigate  = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const updateUser = (field: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!user.email || !user.password) {
            setModalMessage('Please fill in all fields.');
            setShowModal(true);
            setLoading(false);
            return;
        }

        try {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(async (userCredential) => {
                    const loggedInUser = userCredential.user;
                    setAppState({
                        user: loggedInUser,
                        userData: null,
                    });
                    console.log('User logged in:', loggedInUser);
                    setLoading(false);
                    setModalMessage('Login successful!');
                    setShowModal(true);
                    navigate('/');

                })
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        }
        setModalMessage(error || 'Login failed. Please try again later.');
        setShowModal(true);
        console.error('Login error: ', err);
    }
}

if (loading) {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
    );
}

return (
    <div className="flex flex-col items-center justify-center w-full">
        <form className=" bg-slate-50 border-4 border-green-200 py-10 px-6 md:px-16 rounded-3xl shadow-xl" onSubmit={handleLogin}>
            <h1 className="text-3xl font-bold mb-14 text-center">Login</h1>
            <div className="mb-4">
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => updateUser('email', e.target.value)}
                    required
                />
            </div>
            <div className="mb-6 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => updateUser('password', e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <button type='submit' className='justify-center cursor-pointer shadow-2xs shadow-green-300 bg-green-300 hover:text-white text-black hover:shadow-inner hover:shadow-green-300 font-bold rounded px-24 py-3 w-full'>Sign in</button>
            <p className='mt-16 flex justify-center'>No account yet?
                <a href="/login" className="text-green-500 hover:text-green-700 font-bold ml-2">Sign up here</a>
            </p>
        </form>
        <Modal show={showModal} handleClose={() => setShowModal(false)} message={modalMessage || ''} />
    </div>
)
}
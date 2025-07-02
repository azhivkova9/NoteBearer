import zxcvbn from 'zxcvbn';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../config/firebase-config';
import Modal from '../../UI/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { createUser } from '../../../services/user.services';

export default function RegisterForm() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const strength = zxcvbn(user.password).score;
    const [confirmPassword, setConfirmPassword] = useState('');

    const getStrengthLabel = (score: number) => {
        return ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (user.password !== confirmPassword) {
            setModalMessage('Passwords do not match');
            setLoading(false);
            setShowModal(true);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: `${user.firstName} ${user.lastName}` });

                await createUser(user.email, user.firstName, user.lastName, user.username, userCredential.user.uid);
                await signOut(auth);
                await sendEmailVerification(auth.currentUser);
                setModalMessage('Verification email sent. Please check your inbox.');
                setShowModal(true);
                return;
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Registration failed. Please try again later.');
            }
            setModalMessage(error || 'Registration failed. Please try again later.');
            setShowModal(true);
            console.error('Registration error:', err);
            return;
        } finally {
            setLoading(false);
        }
        if (!error) {
            setModalMessage('Registration successful! Please log in.');
            setShowModal(true);
            setUser({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
            });
            setConfirmPassword('');
            navigate('/login');
        }
    };

    const updateUser = (field: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form className=" bg-slate-50 border-4 border-green-200 py-10 px-6 md:px-16 rounded-3xl shadow-xl" onSubmit={handleRegister}>
                <h1 className="text-3xl font-bold mb-14 text-center">Create an account</h1>
                <div className="mb-4 flex flex-row justify-between gap-4 min-w-lg">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline"
                        placeholder="First name"
                        value={user.firstName}
                        onChange={(e) => updateUser('firstName', e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline"
                        placeholder="Last name"
                        value={user.lastName}
                        onChange={(e) => updateUser('lastName', e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => updateUser('username', e.target.value)}
                        required
                    />
                </div>
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
                        className="absolute inset-y-0 right-3 bottom-6 flex items-center text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className={`font-bold ${strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-400'}`}>{getStrengthLabel(strength)}</span>
                    </p>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className=" shadow-inner border-b-2 rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:shadow-outline "
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='justify-center cursor-pointer shadow-2xs shadow-green-300 bg-green-300 hover:text-white text-black hover:shadow-inner hover:shadow-green-300 font-bold rounded px-24 py-3 w-full'>Sign up</button>
                <p className='mt-16 flex justify-center'>Already have an account?
                    <a href="/login" className="text-green-500 hover:text-green-700 font-bold ml-2">Login here</a>
                </p>
            </form>
            <Modal show={showModal} handleClose={() => setShowModal(false)} message={modalMessage || ''} />
        </div>
    );
}

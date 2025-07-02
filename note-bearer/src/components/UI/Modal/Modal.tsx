import React from 'react'

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    message: string;
};

export default function Modal({ show, handleClose, message }: ModalProps) {
    if (!show) {
        return null;
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg shadow-2xl z-50'>
            <div className='bg-green-100 border-2 border-green-400 text-blue-950 p-6 rounded-lg shadow-lg w-96 relative flex flex-col'>
                <h3 className='text-3xl font-bold text-center mb-4 border-b-2 border-green-400 pb-2'>Notification</h3>
                <p className='text-xl text-white-200 text-center'>{message}</p>
                <button onClick={handleClose} className='mt-6 px-4 py-2 bg-green-300 rounded text-slate-900 cursor-pointer'>Close</button>
            </div>
        </div>
    );
}

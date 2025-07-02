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
        <div className='fixed inset-0 flex items-center justify-center bg-slate-50 bg-opacity-50'>
            <div className='bg-green-100 border-2 border-green-300 text-blue-950 p-6 rounded-lg shadow-lg w-96 relative flex flex-col'>
                <h3 className='text-3xl font-bold text-center mb-4 border-b-2 border-slate-50 pb-2'>Notification</h3>
                <p className='text-2xl text-white-200 text-center'>{message}</p>
                <button onClick={handleClose} className='px-4 py-2 bg-orange-200 rounded shadow-2xl shadow-orange-300'>Close</button>
            </div>
        </div>
    );
}

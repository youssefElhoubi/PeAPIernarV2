import React from 'react'
import { useState, useEffect } from 'react';
type Props = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    message : string
};

const PopUp: React.FC<Props> = ({ isOpen, setIsOpen ,message}) => {
    // console.log(isOpen);
    
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
                <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                    It's a simple Modal
                </div>
                <div className="border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default PopUp

import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, message }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000); // Auto-dismiss after 4 seconds

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Simple Toast Notification */}
            <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded px-6 py-4 flex items-center gap-4 max-w-md shadow-[0_0_30px_rgba(0,255,255,0.3)]">

                {/* Success Icon */}
                <div className="flex-shrink-0">
                    <CheckCircle className="text-green-400" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
                </div>

                {/* Message */}
                <p className="text-cyan-400 font-mono text-sm flex-1">
                    {message}
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;

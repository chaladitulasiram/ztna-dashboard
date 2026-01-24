import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { ShieldCheck, ArrowLeft, Envelope, LockKey, Eye, EyeSlash, Warning } from '@phosphor-icons/react';
import ThreeBackground from '../components/ThreeBackground';
import SuccessModal from '../components/layout/SuccessModal';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                await authService.register(email, password);
                setShowSuccessModal(true);
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    setIsSignUp(false);
                }, 2000);
            } else {
                await authService.login(email, password);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans text-[#F5F5F7] selection:bg-[#2997FF]/30">
            <ThreeBackground />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in">
                {/* Back Link */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute -top-12 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Return to Home
                </button>

                <div className="bg-[#161617]/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-6 shadow-inner">
                            <ShieldCheck size={32} weight="fill" className="text-[#2997FF]" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {isSignUp ? 'Enter your details to initialize access' : 'Authenticate to access the command center'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-xl text-[#FF453A] text-sm font-medium flex items-center gap-2">
                                <Warning size={16} weight="fill" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Envelope size={20} className="text-gray-500 group-focus-within:text-[#2997FF] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#1C1C1E] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2997FF]/50 focus:border-[#2997FF]/50 transition-all text-sm"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockKey size={20} className="text-gray-500 group-focus-within:text-[#2997FF] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 bg-[#1C1C1E] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2997FF]/50 focus:border-[#2997FF]/50 transition-all text-sm"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#2997FF] text-white font-semibold rounded-xl hover:bg-[#2997FF]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(41,151,255,0.4)]"
                        >
                            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
                        >
                            {isSignUp ? (
                                <>
                                    Already have an account? <span className="text-[#2997FF]">Sign In</span>
                                </>
                            ) : (
                                <>
                                    Don't have access? <span className="text-[#2997FF]">Request Account</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="mt-8 flex justify-center items-center gap-2 text-xs font-medium text-gray-500">
                    <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
                    System Secure • Ver 2.0.77
                </div>
            </div>

            {/* Success Toast */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="Registration successful! Please check your email."
            />
        </div>
    );
};

export default Auth;


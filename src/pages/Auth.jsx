import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { Shield, ArrowRight, UserPlus, Lock, Mail, Sparkles, Eye, EyeOff, Terminal } from 'lucide-react';
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
        <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center relative overflow-hidden">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Matrix Rain Effect */}
            <MatrixRain />

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Back Link */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute -top-16 left-0 flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors uppercase font-bold tracking-widest text-xs"
                >
                    <ArrowRight className="rotate-180" size={16} />
                    Return to Root
                </button>

                <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 p-8 rounded relative overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)' }}>

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/50 mb-4 relative group">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Shield className="text-cyan-400 relative z-10" size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2"
                            style={{
                                background: 'linear-gradient(to right, #00ffff, #ff00ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                            }}>
                            {isSignUp ? 'New Identity' : 'System Access'}
                        </h1>
                        <p className="text-cyan-400/60 text-xs font-bold uppercase tracking-widest">
                            {isSignUp ? 'Initialize Neural Link' : 'Verify Credentials'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-wide flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <Terminal size={14} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 group-focus-within:text-pink-400 transition-colors">
                                    Identity String
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/50 border border-cyan-500/30 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all font-mono text-sm"
                                        placeholder="USR.ID@ZNTA.NET"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 group-focus-within:text-pink-400 transition-colors">
                                    Access Key
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 bg-black/50 border border-cyan-500/30 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all font-mono text-sm"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
                            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                        >
                            <span className="relative z-10">{loading ? 'Processing...' : (isSignUp ? 'Initialize' : 'Authenticate')}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 group"
                        >
                            {isSignUp ? (
                                <>
                                    <span>Already have credentials?</span>
                                    <span className="text-cyan-400 group-hover:underline">Log In</span>
                                </>
                            ) : (
                                <>
                                    <span>Need clearance?</span>
                                    <span className="text-cyan-400 group-hover:underline">Request Access</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="mt-8 flex justify-between text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        System Secure
                    </div>
                    <div>Ver 2.0.77</div>
                </div>
            </div>

            {/* Success Toast */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="Registration successful! Check your email to verify."
            />
        </div>
    );
};

// Matrix Rain Component (Reused)
const MatrixRain = () => {
    const [drops, setDrops] = useState([]);

    useEffect(() => {
        const columns = Math.floor(window.innerWidth / 20);
        const newDrops = Array.from({ length: columns }, (_, i) => ({
            id: i,
            x: i * 20,
            y: Math.random() * -500,
            speed: Math.random() * 2 + 1
        }));
        setDrops(newDrops);
    }, []);

    // Cyberpunk characters: 0-9, A-Z, special symbols
    const generateMatrixCharacters = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?/~';
        return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n');
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {drops.map(drop => (
                <div
                    key={drop.id}
                    className="absolute text-cyan-400 text-xs font-mono animate-fall"
                    style={{
                        left: `${drop.x}px`,
                        animationDuration: `${10 / drop.speed}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}>
                    {generateMatrixCharacters()}
                </div>
            ))}
        </div>
    );
};

export default Auth;

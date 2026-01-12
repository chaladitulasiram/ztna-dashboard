import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/Auth';
import { Shield, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await authService.login(email, password);
                navigate('/'); // Redirect to dashboard after login
            } else {
                await authService.register(email, password);
                alert("Check your email for confirmation!");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Parallax Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />

            <div className="glacier-card w-full max-w-md p-8 rounded-3xl relative z-10 border border-white/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-icy-accent rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.4)] mb-4">
                        <Shield className="text-glacier-950" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                        {isLogin ? 'Access Portal' : 'Identity Setup'}
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">Zero Trust Network Access Core</p>
                </div>

                {error && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-lg mb-6 flex items-center gap-2">
                        <Lock size={14} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Corporate Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-icy-accent/50 text-slate-200 transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-icy-accent/50 text-slate-200 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-icy-accent hover:bg-icy-accent/90 text-glacier-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 mt-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    >
                        {loading ? 'VERIFYING...' : isLogin ? 'AUTHORIZE ACCESS' : 'INITIALIZE IDENTITY'}
                        {!loading && (isLogin ? <ArrowRight size={20} /> : <UserPlus size={20} />)}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs font-bold text-slate-500 hover:text-icy-accent transition-colors tracking-widest uppercase"
                    >
                        {isLogin ? 'Request New Identity' : 'Existing Identity? Return to Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/Auth'; // Capital 'A'// Ensure lowercase path
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
                navigate('/dashboard');
            } else {
                await authService.register(email, password);
                alert("Identity initialized! Please verify your email.");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
            <div className="glacier-card w-full max-w-md p-8 rounded-3xl relative z-10 border border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="flex flex-col items-center mb-8">
                    <Shield className="text-blue-400 mb-4" size={48} />
                    <h1 className="text-3xl font-bold text-white uppercase italic">
                        {isLogin ? 'Access Portal' : 'Identity Setup'}
                    </h1>
                </div>

                {error && <div className="text-red-400 text-xs mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white" placeholder="Corporate Email" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white" placeholder="Security Key" />
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all">
                        {loading ? 'VERIFYING...' : isLogin ? 'AUTHORIZE ACCESS' : 'REGISTER'}
                    </button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-xs text-slate-500 hover:text-blue-400 uppercase tracking-widest">
                    {isLogin ? 'Request New Identity' : 'Return to Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/Auth';
import { Shield, ArrowRight, UserPlus, Lock, Mail } from 'lucide-react';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                await authService.register(email, password);
                alert("Registration successful! Verify your email.");
                setIsSignUp(false); // Slide back to login
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
        <div className="min-h-screen bg-glacier-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />

            {/* Sliding Container */}
            <div className={`relative bg-glacier-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-4xl h-[600px] overflow-hidden flex transition-all duration-700 ${isSignUp ? "right-panel-active" : ""}`}>

                {/* Sign Up Form Container */}
                <div className={`absolute top-0 h-full transition-all duration-700 w-1/2 left-0 z-10 ${isSignUp ? "translate-x-full opacity-100 z-50" : "opacity-0 z-0"}`}>
                    <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-10 text-center">
                        <h1 className="text-3xl font-black text-white mb-4">Create Account</h1>
                        <p className="text-slate-400 mb-8 text-sm">Join the Zero Trust Network</p>

                        <div className="w-full space-y-4">
                            <InputGroup icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
                            <InputGroup icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
                        </div>

                        <button disabled={loading} className="mt-8 px-12 py-3 bg-icy-accent text-glacier-950 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                            {loading ? "Registering..." : "Sign Up"} <UserPlus size={18} />
                        </button>
                    </form>
                </div>

                {/* Sign In Form Container */}
                <div className={`absolute top-0 h-full transition-all duration-700 w-1/2 left-0 z-20 ${isSignUp ? "translate-x-full opacity-0" : "opacity-100"}`}>
                    <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-10 text-center">
                        <div className="mb-6 p-4 bg-icy-accent/10 rounded-2xl text-icy-accent">
                            <Shield size={40} />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-4">Welcome Back</h1>
                        <p className="text-slate-400 mb-8 text-sm">Secure Access Portal</p>

                        {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg w-full">{error}</div>}

                        <div className="w-full space-y-4">
                            <InputGroup icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
                            <InputGroup icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
                        </div>

                        <button disabled={loading} className="mt-8 px-12 py-3 bg-white text-glacier-950 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                            {loading ? "Verifying..." : "Sign In"} <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                {/* Overlay Container (The Sliding Part) */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 z-100 ${isSignUp ? "-translate-x-full" : ""}`}>
                    <div className={`bg-gradient-to-br from-icy-accent to-blue-600 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ${isSignUp ? "translate-x-1/2" : "translate-x-0"}`}>

                        {/* Overlay Left (Visible when isSignUp is true) */}
                        <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 transform transition-transform duration-700 ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}`}>
                            <h1 className="text-4xl font-black mb-4">Welcome Back!</h1>
                            <p className="text-white/80 mb-8 px-12 text-center text-sm leading-relaxed">
                                To stay connected with us please login with your personal info
                            </p>
                            <button onClick={() => { setIsSignUp(false); setError(null); }} className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors">
                                Sign In
                            </button>
                        </div>

                        {/* Overlay Right (Visible when isSignUp is false) */}
                        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 transform transition-transform duration-700 ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}`}>
                            <h1 className="text-4xl font-black mb-4">Hello, Friend!</h1>
                            <p className="text-white/80 mb-8 px-12 text-center text-sm leading-relaxed">
                                Enter your personal details and start your journey with us
                            </p>
                            <button onClick={() => { setIsSignUp(true); setError(null); }} className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ icon: Icon, ...props }) => (
    <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-icy-accent transition-colors" size={20} />
        <input
            {...props}
            onChange={(e) => props.onChange(e.target.value)}
            className="w-full bg-glacier-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-icy-accent/50 transition-all placeholder:text-slate-600"
        />
    </div>
);

export default Auth;
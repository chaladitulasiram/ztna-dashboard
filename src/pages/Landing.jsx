import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Menu, X, Twitter, Linkedin, Github,
    Globe, Server, Lock, CheckCircle, Activity
} from 'lucide-react';

const Landing = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-glacier-950 min-h-screen text-white font-sans selection:bg-icy-accent/30 flex flex-col">
            {/* Header */}
            <header className="py-4 sm:py-6 bg-glacier-900/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-9 h-9 bg-icy-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                                <Shield className="text-glacier-950 w-6 h-6" />
                            </div>
                            <span className="font-black text-xl tracking-tighter italic uppercase">ZTNA.Core</span>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                className="text-white hover:text-icy-accent transition-colors"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex md:items-center md:justify-end md:space-x-12">
                            {['Platform', 'Solutions', 'Compliance', 'Docs'].map((item) => (
                                <a key={item} href="#" className="text-base font-medium text-gray-400 transition-all duration-200 hover:text-icy-accent hover:scale-105">
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-5 py-2 text-sm font-bold text-glacier-950 bg-icy-accent rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-white/20"
                            >
                                Secure Login
                            </button>
                        </nav>
                    </div>

                    {/* Mobile Menu */}
                    {expanded && (
                        <nav className="md:hidden mt-4 bg-glacier-900 rounded-xl p-4 border border-white/10 shadow-2xl">
                            <div className="flex flex-col space-y-4">
                                {['Platform', 'Solutions', 'Compliance', 'Docs'].map((item) => (
                                    <a key={item} href="#" className="text-base font-medium text-gray-400 hover:text-white pl-2 border-l-2 border-transparent hover:border-icy-accent transition-all">
                                        {item}
                                    </a>
                                ))}
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="w-full py-3 font-bold text-glacier-950 bg-icy-accent rounded-lg"
                                >
                                    Secure Login
                                </button>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-grow py-12 sm:pb-16 lg:pb-20 xl:pb-24 relative overflow-hidden flex items-center">
                {/* Background Glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />

                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl w-full">
                    <div className="relative flex flex-col lg:flex-row items-center gap-12">

                        {/* Text Content */}
                        <div className="lg:w-2/3 text-center lg:text-left">
                            <p className="text-sm font-bold tracking-widest text-icy-accent uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 flex items-center justify-center lg:justify-start gap-2">
                                <Lock size={14} /> Zero Trust Architecture
                            </p>
                            <h1 className="text-4xl font-black text-white sm:text-6xl lg:text-7xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-icy-accent to-purple-500">
                                    Identity-First
                                </span> <br />
                                Security Perimeter.
                            </h1>
                            <p className="max-w-xl mx-auto lg:mx-0 mt-6 text-lg font-normal text-gray-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                Stop trusting IP addresses. Start verifying identities.
                                Enforce granular access policies and device posture checks for every request, everywhere.
                            </p>

                            <div className="relative inline-flex items-center justify-center mt-10 group animate-in zoom-in duration-1000 delay-200">
                                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-icy-accent to-purple-500 group-hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]"></div>
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-glacier-950 border border-transparent rounded-full hover:bg-glacier-900 transition-colors"
                                >
                                    Deploy Zero Trust
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-8 animate-in fade-in duration-1000 delay-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    <span className="text-sm text-gray-300 font-mono">AES-256 Encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-icy-accent" />
                                    <span className="text-sm text-gray-300 font-mono">Real-time Telemetry</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image / 3D Element */}
                        <div className="lg:w-1/3 relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-300 hidden lg:block">
                            <div className="absolute inset-0 bg-gradient-to-tr from-icy-accent/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
                            <img
                                className="w-full max-w-sm mx-auto lg:max-w-none transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl opacity-90"
                                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                                alt="Security Shield 3D"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* "Security Ops" Footer */}
            <footer className="bg-glacier-900/80 border-t border-white/5 relative z-10 font-mono text-sm">
                {/* Status Bar */}
                <div className="bg-black/30 py-2 border-b border-white/5">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">All Systems Operational</span>
                        </div>
                        <div className="hidden sm:flex gap-4 text-xs text-gray-500">
                            <span>Latency: 24ms</span>
                            <span>Region: US-East-1</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="text-icy-accent w-6 h-6" />
                                <span className="font-black text-lg tracking-tighter italic uppercase text-white font-sans">ZTNA.Core</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                                Redefining perimeter security for the cloud-native era.
                                Verify every user, validate every device, limit every access.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={Twitter} />
                                <SocialIcon icon={Linkedin} />
                                <SocialIcon icon={Github} />
                            </div>
                        </div>

                        {/* Link Columns */}
                        <div>
                            <h3 className="text-xs font-bold text-icy-accent tracking-widest uppercase mb-6">Platform</h3>
                            <ul className="space-y-3">
                                <FooterLink>Identity Aware Proxy</FooterLink>
                                <FooterLink>Device Posture</FooterLink>
                                <FooterLink>Micro-Segmentation</FooterLink>
                                <FooterLink>Threat Intelligence</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-icy-accent tracking-widest uppercase mb-6">Compliance</h3>
                            <ul className="space-y-3">
                                <FooterLink>SOC2 Type II</FooterLink>
                                <FooterLink>ISO 27001</FooterLink>
                                <FooterLink>GDPR Ready</FooterLink>
                                <FooterLink>HIPAA</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-icy-accent tracking-widest uppercase mb-6">Connect</h3>
                            <ul className="space-y-3">
                                <FooterLink>Status Page</FooterLink>
                                <FooterLink>Developer API</FooterLink>
                                <FooterLink>Security Whitepaper</FooterLink>
                                <FooterLink>Contact Sales</FooterLink>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-600">
                            © {new Date().getFullYear()} ZTNA.Core Inc. // Encrypted Connection Established
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">SLA</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FooterLink = ({ children }) => (
    <li>
        <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
            {children}
        </a>
    </li>
);

const SocialIcon = ({ icon: Icon }) => (
    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-icy-accent/20 text-gray-400 hover:text-icy-accent transition-all border border-transparent hover:border-icy-accent/30">
        <Icon size={16} />
    </a>
);

export default Landing;
import React from 'react';
import { Smartphone, Lock, RotateCcw, MapPin, Bell, Trash2 } from 'lucide-react';

const ActionButton = ({ icon: Icon, label, variant = 'default' }) => (
    <button className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${variant === 'danger'
            ? 'border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10'
            : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-purple-500/50 hover:text-purple-400'
        }`}>
        <Icon size={20} className="mb-2" />
        <span className="text-xs font-medium">{label}</span>
    </button>
);

const MobileSecurity = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-white">Mobile Fleet Management</h1>
                <p className="text-slate-400">Managing 154 corporate-enrolled devices</p>
            </header>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <Smartphone className="text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-bold">iPhone 15 Pro - Marketing 04</h3>
                            <p className="text-xs text-slate-500">Last seen: 2 minutes ago • iOS 17.4</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                        Secure
                    </div>
                </div>

                <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <ActionButton icon={Lock} label="Lock Device" />
                    <ActionButton icon={MapPin} label="Locate" />
                    <ActionButton icon={Bell} label="Ring" />
                    <ActionButton icon={RotateCcw} label="Restart" />
                    <ActionButton icon={Bell} label="Send Alert" />
                    <ActionButton icon={Trash2} label="Wipe Data" variant="danger" />
                </div>
            </div>
        </div>
    );
};

export default MobileSecurity;
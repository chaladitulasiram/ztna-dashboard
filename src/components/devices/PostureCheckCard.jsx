import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const PostureCheckCard = ({ deviceName, owner, status, trustScore }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${status === 'compliant' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                    {status === 'compliant' ?
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                        <XCircle className="w-5 h-5 text-rose-400" />
                    }
                </div>
                <div>
                    <h4 className="font-medium text-white">{deviceName}</h4>
                    <p className="text-xs text-slate-400">Owner: {owner}</p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm font-semibold text-white">{trustScore}/100</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Trust Score</div>
            </div>
        </div>
    );
};

export default PostureCheckCard;
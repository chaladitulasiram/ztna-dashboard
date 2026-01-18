import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const PostureCheckCard = ({ deviceName, owner, status, trustScore }) => {
    const isCompliant = status === 'compliant';

    return (
        <div className="relative flex items-center justify-between p-4 bg-black/50 backdrop-blur-xl rounded border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] group font-mono overflow-hidden"
            style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)' }}>

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 group-hover:border-cyan-500 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 group-hover:border-cyan-500 transition-colors" />

            <div className="flex items-center gap-4 relative z-10">
                <div className={`p-2 rounded-full border ${isCompliant
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-pink-500/10 border-pink-500/50'
                    }`}>
                    {isCompliant ?
                        <CheckCircle2 className="w-5 h-5 text-green-400"
                            style={{ filter: 'drop-shadow(0 0 5px rgba(16, 185, 129, 0.8))' }} /> :
                        <XCircle className="w-5 h-5 text-pink-400"
                            style={{ filter: 'drop-shadow(0 0 5px rgba(255, 0, 255, 0.8))' }} />
                    }
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                        {deviceName}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">Owner: {owner}</p>
                </div>
            </div>

            <div className="text-right relative z-10">
                <div className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">
                    {trustScore}/100
                </div>
                <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
                    Trust Score
                </div>
            </div>
        </div>
    );
};

export default PostureCheckCard;
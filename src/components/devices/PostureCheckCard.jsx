import React from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

const PostureCheckCard = ({ deviceName, owner, status, trustScore }) => {
    const isCompliant = status === 'compliant';

    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border border-white/5 hover:border-[#2997FF]/30 transition-all duration-300 hover:scale-[1.01] group">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isCompliant
                        ? 'bg-[#30D158]/10 text-[#30D158]'
                        : 'bg-[#FF453A]/10 text-[#FF453A]'
                    }`}>
                    {isCompliant ? (
                        <CheckCircle size={24} weight="fill" />
                    ) : (
                        <XCircle size={24} weight="fill" />
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-white tracking-tight group-hover:text-[#2997FF] transition-colors">
                        {deviceName}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">{owner}</p>
                </div>
            </div>

            <div className="text-right">
                <div className="text-xl font-bold text-white group-hover:text-shadow transition-all">
                    {trustScore}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                    Trust Score
                </div>
            </div>
        </div>
    );
};

export default PostureCheckCard;

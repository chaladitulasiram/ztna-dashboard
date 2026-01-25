import React from 'react';
import { TrendUp, TrendDown } from '@phosphor-icons/react';

const MetricCard = ({ title, value, icon: Icon, trend, trendValue }) => {
    const isPositive = trend === 'up';

    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#2997FF] group-hover:bg-[#2997FF]/10 transition-colors">
                    <Icon size={20} weight="fill" />
                </div>
                {trendValue && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${isPositive
                        ? 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/20'
                        : 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/20'
                        }`}>
                        {isPositive ? <TrendUp weight="bold" /> : <TrendDown weight="bold" />}
                        <span>{trendValue}%</span>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500 tracking-wide">{title}</h3>
                <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
            </div>
        </div>
    );
};

export default MetricCard;

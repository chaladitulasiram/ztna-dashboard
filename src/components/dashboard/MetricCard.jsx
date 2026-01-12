import React from 'react';

const MetricCard = ({ title, value, icon: Icon, trend, trendValue }) => {
    const isPositive = trend === 'up';

    return (
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-xl hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                    {isPositive ? '+' : '-'}{trendValue}%
                </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    );
};

export default MetricCard;
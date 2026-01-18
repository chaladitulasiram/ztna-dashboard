import React, { useState } from 'react';

const MetricCard = ({ title, value, icon: Icon, trend, trendValue }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isPositive = trend === 'up';

    return (
        <div
            className="relative bg-black/50 backdrop-blur-xl border border-cyan-500/30 p-6 rounded overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 font-mono"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                boxShadow: isHovered
                    ? '0 0 30px rgba(0, 255, 255, 0.3)'
                    : '0 0 10px rgba(0, 255, 255, 0.1)'
            }}
        >
            {/* Corner Brackets */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 transition-all duration-300 ${isHovered ? 'w-6 h-6' : ''}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 transition-all duration-300 ${isHovered ? 'w-6 h-6' : ''}`} />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"
                style={{ transition: 'transform 0.8s ease' }} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50 relative group-hover:scale-110 transition-transform">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Icon
                            className="w-5 h-5 text-cyan-400 relative z-10"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))' }}
                        />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded border uppercase tracking-widest transition-all ${isPositive
                            ? 'bg-green-500/10 text-green-400 border-green-500/50'
                            : 'bg-pink-500/10 text-pink-400 border-pink-500/50'
                        }`}>
                        {isPositive ? '+' : '-'}{trendValue}%
                    </span>
                </div>
                <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
                <p className="text-3xl font-black text-white transition-all duration-300 group-hover:scale-110 origin-left"
                    style={{ textShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none' }}>
                    {value}
                </p>

                {/* Progress indicator */}
                <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-1000"
                        style={{ width: `${Math.min(100, (parseInt(value) || 50))}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
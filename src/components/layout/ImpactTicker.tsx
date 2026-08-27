import React from 'react';
import { Leaf, Sprout, Building2, Sparkles, TrendingUp } from 'lucide-react';
import { ImpactMetrics } from '../../types';

interface ImpactTickerProps {
  metrics: ImpactMetrics;
}

export const ImpactTicker: React.FC<ImpactTickerProps> = ({ metrics }) => {
  return (
    <div id="impact-ticker-banner" className="backdrop-blur-xl bg-[#065F46]/90 text-emerald-100 text-xs py-2.5 px-4 border-b border-white/20 overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="text-[#10B981] font-bold tracking-widest uppercase text-[10px] bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
            LIVE ECO IMPACT
          </span>
          <span className="hidden sm:inline text-emerald-100/90 text-[11px]">
            Hệ sinh thái Chuyển đổi Xanh F&B Toàn diện
          </span>
        </div>

        <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar text-[11px] font-mono">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Leaf className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-emerald-200">Đã thay thế:</span>
            <span className="font-bold text-white tracking-wider">
              {metrics.total_cups_replaced.toLocaleString('vi-VN')}
            </span>
            <span className="text-emerald-300 text-[10px]">ly nhựa</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">Giảm phát thải:</span>
            <span className="font-bold text-white tracking-wider">
              {(metrics.total_co2_avoided_kg / 1000).toFixed(1)}
            </span>
            <span className="text-teal-300 text-[10px]">tấn CO₂e</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-emerald-200">Đối tác F&B:</span>
            <span className="font-bold text-white tracking-wider">
              {metrics.active_merchants_count}
            </span>
            <span className="text-emerald-300 text-[10px]">quán</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
            <Sprout className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-lime-200">Tương đương:</span>
            <span className="font-bold text-white tracking-wider">
              {metrics.trees_equivalent.toLocaleString('vi-VN')}
            </span>
            <span className="text-lime-300 text-[10px]">cây xanh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

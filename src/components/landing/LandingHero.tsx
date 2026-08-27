import React from 'react';
import { 
  Leaf, 
  Store, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  Sprout, 
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { ActiveView, ImpactMetrics } from '../../types';

interface LandingHeroProps {
  metrics: ImpactMetrics;
  setActiveView: (view: ActiveView) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ metrics, setActiveView }) => {
  return (
    <section id="hero-section" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-emerald-200/20 via-teal-100/15 to-lime-100/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/70 border border-white/60 text-[#065F46] text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>Hệ sinh thái Bao Bì Xanh & Loyalty Đổi Thưởng F&B</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Chuyển Đổi Xanh Cho Quán F&B, <br className="hidden sm:block" />
              <span className="text-[#065F46]">
                Giữ Chân Khách Hàng Bằng Điểm Thưởng
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Giải pháp toàn diện từ <strong>nguồn cung ứng bao bì bã mía & PLA giá sỉ tận xưởng</strong>, tùy biến in logo thương hiệu đến <strong>hệ thống Loyalty quét mã QR đáy ly</strong> và đồng bộ tự động với máy tính tiền POS KiotViet / iPOS.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-b2b-portal-btn"
                onClick={() => setActiveView('b2b_portal')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Store className="w-4 h-4" />
                <span>Cổng B2B Cho Quán F&B</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-b2c-app-btn"
                onClick={() => setActiveView('b2c_app')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl backdrop-blur-md bg-white/70 hover:bg-white text-slate-800 font-bold text-sm border border-white/60 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#10B981]" />
                <span>Trải Nghiệm Quét QR & Đổi Quà (B2C)</span>
              </button>
            </div>

            {/* Partner Network & Certifications */}
            <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>FDA & OK Compost Chứng Nhận</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-[#10B981]" />
                <span>MOQ chỉ từ 1.000 sản phẩm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#10B981]" />
                <span>Tích hợp KiotViet / iPOS</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Frosted Glass Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="relative backdrop-blur-xl bg-[#065F46]/90 rounded-3xl p-6 sm:p-7 text-white shadow-2xl border border-white/20">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md text-[#10B981] flex items-center justify-center border border-white/15">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">Live Environmental Dashboard</h3>
                    <p className="text-[10px] text-emerald-200">Cập nhật thời gian thực toàn hệ sinh thái</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 border border-white/20 font-mono">
                  LIVE 2026
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="py-6 text-center space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#10B981] font-semibold font-mono">
                  Tổng Ly Nhựa Đã Thay Thế
                </p>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
                  {metrics.total_cups_replaced.toLocaleString('vi-VN')}
                </div>
                <p className="text-xs text-emerald-100/80 pt-1">
                  tại hơn <span className="text-[#10B981] font-bold">{metrics.active_merchants_count}</span> quán cafe & trà sữa khắp cả nước
                </p>
              </div>

              {/* Sub Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl">
                  <div className="text-[11px] text-emerald-200 font-medium">Giảm Phát Thải CO₂</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {(metrics.total_co2_avoided_kg / 1000).toFixed(1)} <span className="text-xs text-emerald-300">tấn</span>
                  </div>
                  <div className="text-[10px] text-emerald-200/80 mt-1">≈ {metrics.trees_equivalent.toLocaleString('vi-VN')} cây xanh hấp thụ</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl">
                  <div className="text-[11px] text-teal-200 font-medium">Rác Nhựa Tránh Chôn Lấp</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {(metrics.landfill_plastic_avoided_kg / 1000).toFixed(1)} <span className="text-xs text-teal-300">tấn</span>
                  </div>
                  <div className="text-[10px] text-teal-200/80 mt-1">Phân hủy 100% sinh học</div>
                </div>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={() => setActiveView('schema_docs')}
                className="w-full mt-5 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-emerald-200 border border-white/20 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Xem Kiến Trúc & SQL Schema (BƯỚC 1)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  RefreshCw, 
  TreePine, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Award
} from 'lucide-react';
import { ActiveView } from '../../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer id="main-footer" className="backdrop-blur-2xl bg-slate-950/85 text-slate-300 border-t border-white/10 text-sm relative z-10">
      {/* Top Banner Certification Badges */}
      <div className="border-b border-white/10 backdrop-blur-md bg-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl backdrop-blur-md bg-[#10B981]/20 text-[#10B981] flex items-center justify-center border border-[#10B981]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs tracking-wide uppercase">Tiêu Chuẩn Quốc Tế & Chứng Nhận</div>
              <div className="text-xs text-slate-400">100% An toàn vệ sinh thực phẩm & Phân hủy sinh học</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-emerald-300 flex items-center gap-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5" /> FDA 21 CFR 176.170
            </span>
            <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-emerald-300 flex items-center gap-1.5 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5" /> TUV OK Compost Home
            </span>
            <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-emerald-300 flex items-center gap-1.5 shadow-xs">
              <TreePine className="w-3.5 h-3.5" /> BPI Biodegradable
            </span>
            <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-teal-300 shadow-xs">
              DIN CERTCO EN 13432
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#10B981] flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Eco<span className="text-[#10B981]">Pack</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Hệ sinh thái công nghệ tuần hoàn xanh hàng đầu cho ngành F&B Việt Nam. Cung ứng bao bì phân hủy sinh học (bã mía, PLA, cỏ bàng) và giải pháp tích điểm Loyalty chống gian lận qua QR Ly Xanh.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Tòa nhà Eco-Tech Center, 128 Nguyễn Đình Chiểu, Q.3, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Hotline B2B: 1800 6828 (Miễn phí) - CSKH: 028 7300 8899</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>b2b@ecopack.vn / support@ecorewards.vn</span>
              </div>
            </div>
          </div>

          {/* B2B Wholesale Links */}
          <div>
            <h4 className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-4">
              B2B Wholesale Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('b2b_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Catalog Bao Bì Bã Mía & PLA
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2b_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Bảng Giá Sỉ Phân Tầng (Tiered Pricing)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2b_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Custom Branding Mockup Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2b_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Đăng Ký Nhận Bộ Mẫu Thử (Sample Kit)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2b_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Hệ Thống Yêu Cầu Báo Giá (RFQ)
                </button>
              </li>
            </ul>
          </div>

          {/* B2C Eco-Reward Links */}
          <div>
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-4">
              B2C Loyalty App
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('b2c_app')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Quét Mã QR Đáy Ly Xanh
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2c_app')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Ví Điểm Xanh (Green Points)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2c_app')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Đổi Voucher Đồ Uống & Quà Tặng
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('b2c_app')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Tích Điểm Tự Động Qua POS Quán
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('landing')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Bản Đồ Quán F&B Xanh Tham Gia
                </button>
              </li>
            </ul>
          </div>

          {/* Tech & POS Integrations */}
          <div>
            <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-4">
              Kiến Trúc & Tích Hợp
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('schema_docs')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1">
                  <span>Supabase Schema & RLS</span>
                  <ExternalLink className="w-3 h-3 text-[#10B981]" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('schema_docs')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Cấu Trúc Next.js 14 App Router
                </button>
              </li>
              <li>
                <span className="text-slate-400">Webhook KiotViet / iPOS / Sapo</span>
              </li>
              <li>
                <span className="text-slate-400">Cổng Thanh Toán MoMo / VNPay</span>
              </li>
              <li>
                <button onClick={() => setActiveView('admin_portal')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Super Admin Management
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 EcoPack & GreenRewards Vietnam. Bảo lưu mọi quyền. Phát triển cho mục tiêu Net-Zero 2050.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Chính sách bảo mật RLS</span>
            <span className="hover:text-slate-300 cursor-pointer">Điều khoản dịch vụ B2B</span>
            <span className="hover:text-slate-300 cursor-pointer">Quy chế chống gian lận QR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

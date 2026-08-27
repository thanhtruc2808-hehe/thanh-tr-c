import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PackageCheck, 
  Boxes, 
  QrCode, 
  TrendingUp, 
  Building2, 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus
} from 'lucide-react';
import { ImpactMetrics, RFQRequest, Merchant } from '../../types';

interface AdminOverviewPreviewProps {
  metrics: ImpactMetrics;
  rfqs: RFQRequest[];
  merchants: Merchant[];
}

export const AdminOverviewPreview: React.FC<AdminOverviewPreviewProps> = ({
  metrics,
  rfqs,
  merchants,
}) => {
  const [adminTab, setAdminTab] = useState<'rfqs' | 'merchants' | 'qr_batches'>('rfqs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Banner */}
      <div className="backdrop-blur-xl bg-[#065F46]/95 text-white p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#10B981] text-xs font-semibold border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-white" /> SUPER ADMIN & MERCHANT MANAGEMENT PORTAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Quản Trị Hệ Sinh Thái Bao Bì B2B & Chiến Dịch Loyalty B2C
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Kiểm duyệt yêu cầu báo giá RFQ, theo dõi hạn ngạch in ấn & kho bao bì, quản lý mã QR ly chống gian lận và cấu hình chiến dịch điểm thưởng cho đối tác F&B.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
          <button
            onClick={() => setAdminTab('rfqs')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminTab === 'rfqs'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <FileText className="w-4 h-4" /> 1. Duyệt Báo Giá RFQ ({rfqs.length})
          </button>
          <button
            onClick={() => setAdminTab('merchants')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminTab === 'merchants'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <Building2 className="w-4 h-4" /> 2. Danh Sách Đối Tác F&B ({merchants.length})
          </button>
          <button
            onClick={() => setAdminTab('qr_batches')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminTab === 'qr_batches'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <QrCode className="w-4 h-4" /> 3. Quản Lý Lô QR Đáy Ly
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="backdrop-blur-xl bg-white/60 p-5 rounded-3xl border border-white/50 shadow-lg space-y-1">
          <div className="text-xs text-slate-500 font-medium">Doanh Số Sỉ B2B Tháng Này</div>
          <div className="text-2xl font-black font-mono text-slate-900">1.482.000.000đ</div>
          <div className="text-[10px] text-[#065F46] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#10B981]" /> +24.5% so với tháng trước
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/60 p-5 rounded-3xl border border-white/50 shadow-lg space-y-1">
          <div className="text-xs text-slate-500 font-medium">Đối Tác F&B Đang Hoạt Động</div>
          <div className="text-2xl font-black font-mono text-slate-900">{metrics.active_merchants_count} quán</div>
          <div className="text-[10px] text-[#065F46] font-semibold">Tích hợp POS KiotViet & iPOS</div>
        </div>

        <div className="backdrop-blur-xl bg-white/60 p-5 rounded-3xl border border-white/50 shadow-lg space-y-1">
          <div className="text-xs text-slate-500 font-medium">Tổng Ly Nhựa Đã Thay Thế</div>
          <div className="text-2xl font-black font-mono text-[#065F46]">
            {metrics.total_cups_replaced.toLocaleString('vi-VN')}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold">Net-Zero 2050 ESG Verified</div>
        </div>

        <div className="backdrop-blur-xl bg-white/60 p-5 rounded-3xl border border-white/50 shadow-lg space-y-1">
          <div className="text-xs text-slate-500 font-medium">Tỷ Lệ Quét QR Tiêu Dùng (B2C)</div>
          <div className="text-2xl font-black font-mono text-slate-900">88.4%</div>
          <div className="text-[10px] text-[#065F46] font-semibold">94.350 người dùng thường xuyên</div>
        </div>
      </div>

      {/* ADMIN SUB-VIEW: RFQ MANAGEMENT */}
      {adminTab === 'rfqs' && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hồ Sơ Yêu Cầu Báo Giá B2B (RFQ Pipeline)</h3>
              <p className="text-xs text-slate-500">Phê duyệt mẫu in, tính toán đơn giá sỉ và gửi hợp đồng số</p>
            </div>
            <button className="px-4 py-2 rounded-2xl bg-[#065F46] hover:bg-[#044734] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all">
              <Plus className="w-3.5 h-3.5" /> Tạo Đơn Báo Giá Mới
            </button>
          </div>

          <div className="divide-y divide-white/40">
            {rfqs.map(rfq => (
              <div key={rfq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{rfq.rfq_code}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      rfq.status === 'quoted'
                        ? 'bg-emerald-100/90 text-[#065F46]'
                        : 'bg-amber-100/90 text-amber-800'
                    }`}>
                      {rfq.status === 'quoted' ? 'Đã Báo Giá' : 'Đang Kiểm Duyệt'}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">{rfq.merchant_brand}</div>
                  <div className="text-xs text-slate-500">
                    Sản phẩm: <strong>{rfq.product_title}</strong> • SL: <strong>{rfq.estimated_volume.toLocaleString('vi-VN')} chiếc</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {rfq.quoted_total_price && (
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Tổng giá trị báo:</div>
                      <div className="font-bold font-mono text-[#065F46] text-sm">
                        {rfq.quoted_total_price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  )}
                  <button className="px-4 py-2 rounded-2xl backdrop-blur-md bg-white/80 hover:bg-white text-[#065F46] text-xs font-bold border border-white/70 shadow-xs transition-all cursor-pointer">
                    Chi Tiết & Duyệt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN SUB-VIEW: MERCHANTS LIST */}
      {adminTab === 'merchants' && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Danh Sách Đối Tác Quán F&B</h3>
            <span className="text-xs text-slate-500">Tổng: {merchants.length} chuỗi thương hiệu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {merchants.map(m => (
              <div key={m.id} className="p-5 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img src={m.logo_url} alt={m.brand_name} className="w-10 h-10 rounded-2xl object-cover shadow-xs" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{m.brand_name}</h4>
                    <div className="text-[10px] text-[#065F46] font-semibold">{m.tier_level}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/50">
                  <div>POS: <strong>{m.pos_system_type.toUpperCase()}</strong> (Tự động sync)</div>
                  <div>Đã phát hành: <strong>{m.total_cups_issued.toLocaleString('vi-VN')} ly</strong></div>
                  <div>CO₂ giảm thiểu: <strong>{m.total_co2_offset_kg.toLocaleString('vi-VN')} kg</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN SUB-VIEW: QR BATCHES */}
      {adminTab === 'qr_batches' && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Quản Lý Lô Mã QR In Đáy Ly Sinh Thái</h3>
            <button className="px-4 py-2 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all">
              <Plus className="w-3.5 h-3.5" /> Xuất Lô QR Mới (Laser Nonce)
            </button>
          </div>

          <div className="p-4 rounded-2xl backdrop-blur-md bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 space-y-2 shadow-xs">
            <div className="font-bold flex items-center gap-2 text-[#065F46]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Quy Trình Khắc Laser Mã QR Tamper-Proof
            </div>
            <p className="text-slate-600 leading-relaxed">
              Mỗi mã QR được tạo bằng thuật toán mã hóa SHA-256 kèm Nonce ngẫu nhiên, in trực tiếp dưới đáy ly bằng laser CO2 hữu cơ không dùng hóa chất độc hại. Hệ thống tự động khóa mã ngay sau lần quét đầu tiên để chống gian lận tích điểm chéo.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

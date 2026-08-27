import React, { useState } from 'react';
import { 
  FolderTree, 
  Database, 
  Code2, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  Server, 
  Smartphone, 
  Cpu, 
  Boxes,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ArchitectureDocs: React.FC = () => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'folder_structure' | 'supabase_schema' | 'tech_stack' | 'rls_security'>('folder_structure');

  const copySqlToClipboard = () => {
    const sqlText = `-- Supabase Schema for EcoPack & GreenRewards
-- Loaded from /schema.sql
-- Contains 10 Tables, Triggers, RLS, Functions & Indexes
`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="backdrop-blur-xl bg-[#065F46]/95 text-white p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#10B981] text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-white" /> BƯỚC 1: KIẾN TRÚC HỆ THỐNG & SUPABASE POSTGRESQL SCHEMA
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Next.js 14 App Router Architecture & Core Database Design
          </h1>
          <p className="text-emerald-100/80 text-sm max-w-3xl leading-relaxed">
            Thiết kế chuẩn hóa cho nền tảng thương mại điện tử bao bì B2B kết hợp hệ thống tích điểm sinh thái B2C (Green Loyalty Engine). Sẵn sàng mở rộng cho chuỗi F&B hàng triệu giao dịch với Supabase PostgreSQL, RLS bảo mật và API Webhook POS.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/15">
          <button
            onClick={() => setActiveTab('folder_structure')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'folder_structure'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25 font-bold'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <FolderTree className="w-4 h-4" /> 1. Sơ Đồ Cấu Trúc Next.js 14 App Router
          </button>

          <button
            onClick={() => setActiveTab('supabase_schema')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'supabase_schema'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25 font-bold'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <Database className="w-4 h-4" /> 2. Supabase PostgreSQL Schema (8 Core Tables)
          </button>

          <button
            onClick={() => setActiveTab('rls_security')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'rls_security'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25 font-bold'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 3. RLS & Quy Chế Chống Gian Lận QR
          </button>

          <button
            onClick={() => setActiveTab('tech_stack')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tech_stack'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25 font-bold'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <Layers className="w-4 h-4" /> 4. Tech Stack & Integration Flow
          </button>
        </div>
      </div>

      {/* Tab 1: Folder Structure */}
      {activeTab === 'folder_structure' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100/90 text-[#065F46] flex items-center justify-center font-bold">
                  <FolderTree className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Next.js 14 App Router Directory Tree</h3>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#065F46] backdrop-blur-md bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60">
                Production-Ready
              </span>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-md text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
              <pre>{`my-green-fnb-ecosystem/
├── app/
│   ├── (public)/                 # Landing page & Public catalog
│   │   ├── page.tsx              # Hero, Impact counter & Product highlights
│   │   ├── catalog/              # Public product catalog & specs
│   │   └── impact/               # Detailed environmental ESG impact report
│   ├── (b2b)/                    # B2B Wholesale Portal (Merchant & Chains)
│   │   ├── portal/
│   │   │   ├── layout.tsx        # B2B Layout with wholesale sidebar
│   │   │   ├── catalog/          # Tiered pricing catalog with bulk order
│   │   │   ├── mockup-studio/    # 3D/2D Cup Branding Studio with Logo upload
│   │   │   ├── rfq/              # RFQ submission & Quote negotiation
│   │   │   ├── sample-kit/       # Free sample kit registration
│   │   │   └── orders/           # Wholesale orders & recurring subscription
│   ├── (b2c)/                    # B2C Mobile-First Loyalty WebApp
│   │   ├── app/
│   │   │   ├── layout.tsx        # Mobile-First viewport & bottom bar
│   │   │   ├── scan/             # Camera QR Code Scanner on eco cups
│   │   │   ├── wallet/           # Green Points Wallet & CO2 ledger
│   │   │   ├── rewards/          # Redemption marketplace & drink vouchers
│   │   │   └── history/          # Green consumption audit history
│   ├── (admin)/                  # Super Admin Platform
│   │   ├── admin/
│   │   │   ├── dashboard/        # ESG metrics, Revenue, User analytics
│   │   │   ├── wholesale-orders/ # B2B production line & shipping
│   │   │   ├── rfq-management/   # Review, quote & approve designs
│   │   │   ├── qr-batches/       # Issue serialized anti-fraud QR codes
│   │   │   └── campaigns/        # Reward points config & voucher pool
│   ├── api/                      # Edge Route Handlers & Webhooks
│   │   ├── webhooks/
│   │   │   ├── pos/
│   │   │   │   ├── kiotviet/route.ts   # KiotViet POS order sync webhook
│   │   │   │   └── ipos/route.ts       # iPOS order sync webhook
│   │   │   └── payment/
│   │   │       ├── momo/route.ts       # MoMo IPN Webhook
│   │   │       └── vnpay/route.ts      # VNPay Return / IPN
│   │   ├── rfq/submit/route.ts         # RFQ Processor with email notification
│   │   └── loyalty/scan-qr/route.ts    # Atomic QR scan & points credit
│   ├── layout.tsx                # Root layout with fonts & providers
│   └── globals.css               # Tailwind CSS styles & design tokens
├── components/
│   ├── ui/                       # Shadcn/UI primitives (Button, Dialog, etc.)
│   ├── b2b/                      # B2B Mockup Canvas, Tier Pricing Calculator
│   ├── b2c/                      # QR Scanner, Wallet Cards, Voucher Voucher
│   ├── landing/                  # Hero Banner, Impact Ticker, 3D Models
│   └── shared/                   # Navbar, Footer, MobileNav, RoleSwitcher
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server-side Supabase client (cookies)
│   │   └── admin.ts              # Service role client for background jobs
│   ├── validations/              # Zod schemas (RFQForm, OrderForm, QRScan)
│   ├── pos-adapters/             # Standardized parser for POS webhooks
│   └── qr-engine.ts              # Hash generation & HMAC validation for cups
├── store/                        # Zustand state stores (cart, wallet, filter)
├── types/                        # TypeScript interfaces & database types
├── schema.sql                    # Full PostgreSQL schema with RLS & Triggers
└── package.json`}</pre>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="backdrop-blur-xl bg-emerald-50/80 p-6 rounded-3xl border border-emerald-200/80 shadow-lg space-y-4">
              <h3 className="font-bold text-[#065F46] text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                Đặc Điểm Kiến Trúc Chuẩn Hóa
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 backdrop-blur-md bg-white/80 rounded-2xl border border-white/70 shadow-xs">
                  <div className="font-bold text-[#065F46] mb-1">1. Route Groups Tách Biệt Theo Phân Hệ</div>
                  <p className="text-slate-600">
                    Sử dụng <code>(public)</code>, <code>(b2b)</code>, <code>(b2c)</code>, <code>(admin)</code> để cô lập layout, middleware kiểm tra quyền (RBAC) và tối ưu hóa bundle tải trang độc lập.
                  </p>
                </div>

                <div className="p-3.5 backdrop-blur-md bg-white/80 rounded-2xl border border-white/70 shadow-xs">
                  <div className="font-bold text-[#065F46] mb-1">2. Hybrid Loyalty Engine (QR + POS Webhook)</div>
                  <p className="text-slate-600">
                    Thư mục <code>/api/webhooks/pos/*</code> đón nhận sự kiện mua đồ uống từ KiotViet/iPOS, tự động tính điểm theo dung tích ly và đẩy vào ví khách hàng.
                  </p>
                </div>

                <div className="p-3.5 backdrop-blur-md bg-white/80 rounded-2xl border border-white/70 shadow-xs">
                  <div className="font-bold text-[#065F46] mb-1">3. B2B Mockup Studio & RFQ Pipeline</div>
                  <p className="text-slate-600">
                    Phân hệ Studio cho phép quán kéo thả logo lên mô hình ly xanh 2D/3D trực quan, tự động kết xuất preview để nộp yêu cầu báo giá (RFQ) trực tiếp.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-[#065F46]/95 text-white p-6 rounded-3xl border border-white/20 shadow-xl space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#10B981]" />
                Next.js 14 Server Components & Actions
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Tận dụng Server Components để load Catalog sản phẩm và Báo cáo ESG nhanh chóng, kết hợp Client Components cho bộ công cụ tương tác cao như QR Scanner, Mockup Canvas và Bộ tính giá sỉ phân tầng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Supabase Schema */}
      {activeTab === 'supabase_schema' && (
        <div className="space-y-6">
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Supabase PostgreSQL Schema (8 Core Tables + Triggers)</h3>
                <p className="text-xs text-slate-500">Đã lưu trong tập tin <code>/schema.sql</code> ở thư mục gốc.</p>
              </div>
              <button
                onClick={copySqlToClipboard}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold bg-[#10B981] hover:bg-[#059669] text-white transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {copiedSql ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'Đã sao chép SQL!' : 'Sao Chép Schema SQL'}</span>
              </button>
            </div>

            {/* Table Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">1. users</div>
                <p className="text-[11px] text-slate-600">ID, role (admin/merchant/consumer), phone, email, green_points, CO2 offset stats.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">2. merchants</div>
                <p className="text-[11px] text-slate-600">F&B Brand, POS system type (KiotViet/iPOS), POS API keys, address, ESG metrics.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">3. products</div>
                <p className="text-[11px] text-slate-600">SKU, material (bã mía/PLA/cỏ bàng), capacity, base_price, moq, eco certifications.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">4. tier_pricings</div>
                <p className="text-[11px] text-slate-600">B2B volume price brackets (1k, 5k, 10k, 50k+), price_per_unit, discount %.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">5. rfq_requests</div>
                <p className="text-[11px] text-slate-600">Merchant custom quote requests, logo URL, 3D mockup link, status, quoted price.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">6. eco_cups</div>
                <p className="text-[11px] text-slate-600">Serialized tamper-proof QR hash on cups, points_value, is_scanned, scanned_at.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">7. loyalty_transactions</div>
                <p className="text-[11px] text-slate-600">Green ledger audit trail: points, action_type, co2_saved_kg, POS order id metadata.</p>
              </div>

              <div className="p-4 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs">
                <div className="font-bold text-[#065F46] text-xs font-mono mb-1">8. rewards</div>
                <p className="text-[11px] text-slate-600">Redemption items: Drink vouchers, bamboo tumblers, tree planting credits.</p>
              </div>
            </div>

            {/* SQL Viewer */}
            <div className="bg-slate-950/90 backdrop-blur-md text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-96 shadow-inner">
              <pre>{`-- ATOMIC QR SCAN & REDEEM PROCEDURE IN /schema.sql
CREATE OR REPLACE FUNCTION scan_eco_cup_qr(
    p_consumer_id UUID,
    p_qr_hash VARCHAR(128),
    p_device_fingerprint TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_cup RECORD;
    v_transaction_id UUID;
BEGIN
    SELECT * INTO v_cup FROM public.eco_cups 
    WHERE qr_code_hash = p_qr_hash FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Mã QR không tồn tại.');
    END IF;

    IF v_cup.is_scanned THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Mã QR này đã được quét trước đó.');
    END IF;

    UPDATE public.eco_cups
    SET is_scanned = TRUE, scanned_at = NOW(), scanned_by_user_id = p_consumer_id
    WHERE id = v_cup.id;

    INSERT INTO public.loyalty_transactions (
        consumer_id, merchant_id, cup_id, points, action_type, co2_saved_kg, title
    ) VALUES (
        p_consumer_id, v_cup.merchant_id, v_cup.id, v_cup.points_value,
        'qr_scan_cup', (v_cup.co2_offset_grams::numeric / 1000.0), 'Thưởng quét Ly Xanh'
    ) RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object('success', TRUE, 'points_awarded', v_cup.points_value, 'transaction_id', v_transaction_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: RLS Security */}
      {activeTab === 'rls_security' && (
        <div className="backdrop-blur-xl bg-white/60 p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/90 text-[#065F46] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Row Level Security (RLS) & Anti-Fraud Architecture</h3>
              <p className="text-xs text-slate-500">Phân quyền đa tầng dựa trên PostgreSQL RLS và cơ chế bảo vệ điểm thưởng</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                RLS cho Consumer
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                <li>Chỉ xem và chỉnh sửa thông tin profile cá nhân <code>auth.uid() = id</code></li>
                <li>Chỉ xem lịch sử giao dịch điểm và voucher thuộc về chính mình.</li>
                <li>Không có quyền tự động chèn điểm trực tiếp mà phải thông qua Stored Procedure / Webhook POS an toàn.</li>
              </ul>
            </div>

            <div className="p-5 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                RLS cho Merchant (Quán F&B)
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                <li>Xem và quản lý các yêu cầu báo giá RFQ, đơn hàng B2B thuộc sở hữu của brand.</li>
                <li>Xem thống kê tổng số ly đã phát hành và lượng CO2 giảm thiểu.</li>
                <li>Cấu hình POS Webhook Secret và khóa API đồng bộ máy POS.</li>
              </ul>
            </div>

            <div className="p-5 rounded-3xl backdrop-blur-md bg-white/70 border border-white/60 shadow-xs space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Cơ chế Chống Gian Lận QR Ly Xanh
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                <li>Khóa dòng <code>FOR UPDATE</code> ngăn chặn quét đồng thời (race condition double-spend).</li>
                <li>Mỗi mã QR là duy nhất (Unique Nonce Hash) in laser dưới đáy ly.</li>
                <li>Giới hạn số lần quét tối đa mỗi ngày trên 1 thiết bị/người dùng.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Tech Stack */}
      {activeTab === 'tech_stack' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/90 text-[#065F46] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Frontend Framework</h4>
            <p className="text-xs text-slate-600">Next.js 14 App Router, React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100/90 text-teal-800 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Backend & Database</h4>
            <p className="text-xs text-slate-600">Supabase PostgreSQL, Edge Functions, Row Level Security, Storage Buckets cho Logo Mockups.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-100/90 text-lime-800 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">State & Forms</h4>
            <p className="text-xs text-slate-600">Zustand cho giỏ hàng B2B & ví điểm, React Query (TanStack) cho live sync, Zod validation cho form RFQ.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/90 text-amber-800 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">POS & Payments</h4>
            <p className="text-xs text-slate-600">Webhook KiotViet / iPOS / Sapo, Cổng thanh toán MoMo / VNPay / Chuyển khoản ngân hàng B2B.</p>
          </div>
        </div>
      )}
    </div>
  );
};

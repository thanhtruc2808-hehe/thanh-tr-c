import React, { useState } from 'react';
import { 
  Store, 
  Upload, 
  Sparkles, 
  Layers, 
  FileText, 
  Gift, 
  CheckCircle2, 
  Send, 
  Calculator, 
  ShieldCheck, 
  Truck, 
  RotateCw,
  RefreshCcw,
  Eye,
  Sliders,
  Palette
} from 'lucide-react';
import { Product, RFQRequest } from '../../types';

interface B2BOverviewPreviewProps {
  products: Product[];
  rfqs: RFQRequest[];
  onAddRFQ?: (newRfq: Partial<RFQRequest>) => void;
}

export const B2BOverviewPreview: React.FC<B2BOverviewPreviewProps> = ({
  products,
  rfqs,
  onAddRFQ,
}) => {
  const [b2bTab, setB2bTab] = useState<'mockup_studio' | 'rfq_form' | 'sample_kit' | 'price_calculator'>('mockup_studio');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cupQuantity, setCupQuantity] = useState<number>(20000);
  const [cupColorTheme, setCupColorTheme] = useState<string>('#065F46'); // Forest Green
  const [brandLogoText, setBrandLogoText] = useState<string>('KATINAT SAIGON');
  const [logoPosition, setLogoPosition] = useState<'center' | 'top' | 'wrap'>('center');
  const [sampleKitSubmitted, setSampleKitSubmitted] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  // RFQ Form state
  const [merchantBrand, setMerchantBrand] = useState('The Coffee House Saigon');
  const [contactName, setContactName] = useState('Trần Minh Đức');
  const [contactPhone, setContactPhone] = useState('0919888999');
  const [deliveryAddress, setDeliveryAddress] = useState('86 Cao Thắng, Quận 3, TP. Hồ Chí Minh');
  const [customNotes, setCustomNotes] = useState('Yêu cầu in 2 màu logo nhận diện, dùng mực gốc đậu nành an toàn.');

  // Tier calculation
  const getCalculatedPrice = (qty: number) => {
    if (!selectedProduct.tier_pricings?.length) return selectedProduct.base_price;
    const tier = selectedProduct.tier_pricings.find(t => {
      if (t.max_quantity === null || t.max_quantity === undefined) return qty >= t.min_quantity;
      return qty >= t.min_quantity && qty <= t.max_quantity;
    });
    return tier ? tier.price_per_unit : selectedProduct.base_price;
  };

  const currentUnitPrice = getCalculatedPrice(cupQuantity);
  const totalWholesaleEstimate = currentUnitPrice * cupQuantity;

  const handleRFQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => {
      setRfqSubmitted(false);
      alert('Yêu cầu báo giá (RFQ) đã được gửi thành công đến đội ngũ kỹ sư bao bì EcoPack! Mã đơn: RFQ-2026-NEW');
    }, 1500);
  };

  const handleSampleKitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleKitSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="backdrop-blur-xl bg-[#065F46]/95 text-white p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#10B981] text-xs font-semibold border border-white/20">
            <Store className="w-3.5 h-3.5 text-white" /> B2B WHOLESALE & CUSTOM BRANDING PORTAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Cổng Đặt Sỉ Bao Bì & Studio Tùy Biến Thương Hiệu F&B
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Thiết kế riêng cho các chuỗi cafe, nhà hàng, thương hiệu trà sữa. Trực quan hóa mẫu in logo lên ly bã mía/PLA, tính giá sỉ theo bậc và quản lý quy trình gửi mẫu & báo giá RFQ.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
          <button
            onClick={() => setB2bTab('mockup_studio')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              b2bTab === 'mockup_studio'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 1. Custom Mockup Studio
          </button>
          <button
            onClick={() => setB2bTab('rfq_form')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              b2bTab === 'rfq_form'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <FileText className="w-4 h-4" /> 2. Hệ Thống Báo Giá RFQ
          </button>
          <button
            onClick={() => setB2bTab('sample_kit')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              b2bTab === 'sample_kit'
                ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/25'
                : 'backdrop-blur-md bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            }`}
          >
            <Gift className="w-4 h-4" /> 3. Đăng Ký Sample Kit
          </button>
        </div>
      </div>

      {/* TAB 1: CUSTOM BRANDING MOCKUP STUDIO */}
      {b2bTab === 'mockup_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Mockup Studio Visual Canvas */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-white/60 p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/40">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#10B981]" />
                  <span className="font-bold text-slate-900 text-sm">3D/2D Realtime Mockup Canvas</span>
                </div>
                <span className="text-[11px] font-semibold backdrop-blur-md bg-emerald-50/80 text-[#065F46] px-3 py-1 rounded-full border border-emerald-200/60">
                  {selectedProduct.title}
                </span>
              </div>

              {/* Mockup Canvas Container */}
              <div className="relative my-6 aspect-4/3 sm:aspect-16/10 rounded-2xl bg-gradient-to-b from-white/80 via-emerald-50/40 to-slate-100/80 backdrop-blur-md flex items-center justify-center p-8 overflow-hidden border border-white/60 shadow-inner">
                
                {/* 3D Realistic Cup Silhouette Graphic */}
                <div className="relative w-48 sm:w-56 h-64 sm:h-72 bg-gradient-to-r from-amber-50 via-amber-100/90 to-amber-200 rounded-b-3xl rounded-t-sm shadow-2xl border-t-8 border-amber-300/80 flex flex-col items-center justify-center transition-all duration-300 transform hover:rotate-1">
                  
                  {/* Cup Rim & Texture */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-amber-200/80 rounded-t-sm shadow-inner"></div>

                  {/* Brand Custom Logo Overlay */}
                  <div 
                    className="z-10 p-4 rounded-xl text-center border-2 border-dashed transition-all"
                    style={{ borderColor: cupColorTheme, color: cupColorTheme }}
                  >
                    <div className="w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-xs mb-1" style={{ borderColor: cupColorTheme }}>
                      ECO
                    </div>
                    <div className="font-black tracking-widest text-sm uppercase">
                      {brandLogoText || 'TÊN QUÁN CỦA BẠN'}
                    </div>
                    <div className="text-[9px] font-medium tracking-wide mt-0.5 opacity-80">
                      100% BIODEGRADABLE CUP
                    </div>
                  </div>

                  {/* Tamper-Proof Anti-Fraud QR Code on Bottom of Cup */}
                  <div className="absolute bottom-3 text-center">
                    <div className="w-8 h-8 bg-white p-1 rounded-md shadow-xs border border-slate-300 mx-auto flex items-center justify-center text-[7px] font-mono font-bold text-slate-800">
                      [QR-ECO]
                    </div>
                    <span className="text-[8px] text-amber-900/60 font-mono">Serial: LOT-2026-Q3</span>
                  </div>

                  {/* Biodegradable Eco stamp */}
                  <div className="absolute top-6 right-3 text-[9px] font-bold text-emerald-800/60 rotate-12">
                    OK COMPOST ✓
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-white/40">
              <span>Độ phân giải bản in: <strong>300 DPI Vector</strong></span>
              <span>Mực in: <strong>Mực đậu nành Eco Safe</strong></span>
            </div>
          </div>

          {/* Right: Customization Controls & Dynamic Tier Pricing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#10B981]" />
                Cấu Hình Mẫu In Thương Hiệu
              </h3>

              {/* Select Base Product */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Chọn mẫu bao bì gốc:</label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = products.find(p => p.id === e.target.value);
                    if (found) setSelectedProduct(found);
                  }}
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (MOQ: {p.moq.toLocaleString('vi-VN')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Name / Logo Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Tên thương hiệu / Slogan in trên ly:</label>
                <input
                  type="text"
                  value={brandLogoText}
                  onChange={(e) => setBrandLogoText(e.target.value)}
                  placeholder="Nhập tên quán..."
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
              </div>

              {/* Color Theme Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Màu sắc nhận diện thương hiệu:</label>
                <div className="flex items-center gap-2">
                  {[
                    { color: '#065F46', name: 'Forest Green' },
                    { color: '#1E3A8A', name: 'Navy Blue' },
                    { color: '#78350F', name: 'Coffee Brown' },
                    { color: '#9F1239', name: 'Berry Red' },
                    { color: '#111827', name: 'Minimalist Black' },
                  ].map(item => (
                    <button
                      key={item.color}
                      onClick={() => setCupColorTheme(item.color)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer shadow-xs ${
                        cupColorTheme === item.color ? 'scale-125 ring-2 ring-[#10B981] ring-offset-2' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                      title={item.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Slider & Tier Calculation */}
              <div className="space-y-2 pt-2 border-t border-white/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Số lượng đặt hàng dự kiến:</span>
                  <span className="font-bold font-mono text-[#065F46] text-sm">
                    {cupQuantity.toLocaleString('vi-VN')} chiếc
                  </span>
                </div>

                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={cupQuantity}
                  onChange={(e) => setCupQuantity(Number(e.target.value))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.000 (Thử nghiệm)</span>
                  <span>10.000</span>
                  <span>50.000+ (Giá sỉ tối đa)</span>
                </div>
              </div>

              {/* Pricing Breakdown Summary Card */}
              <div className="backdrop-blur-md bg-white/75 p-4 rounded-2xl border border-white/60 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Đơn giá sỉ phân tầng:</span>
                  <span className="font-bold font-mono text-slate-900">
                    {currentUnitPrice.toLocaleString('vi-VN')}đ / chiếc
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Phí khắc khuôn & in logo:</span>
                  <span className="font-bold text-[#065F46]">
                    {cupQuantity >= 10000 ? 'MIỄN PHÍ' : '500.000đ'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900">Tổng tạm tính:</span>
                    <p className="text-[10px] text-slate-500">Chưa bao gồm VAT</p>
                  </div>
                  <span className="text-lg font-black font-mono text-[#065F46]">
                    {totalWholesaleEstimate.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <button
                onClick={() => setB2bTab('rfq_form')}
                className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Chuyển Sang Nộp Yêu Cầu Báo Giá (RFQ)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RFQ SUBMISSION FORM */}
      {b2bTab === 'rfq_form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 backdrop-blur-xl bg-white/60 p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg">Yêu Cầu Báo Giá Riêng (RFQ - Request For Quote)</h3>
              <p className="text-xs text-slate-500">
                Dành cho chuỗi F&B, doanh nghiệp đặt hàng định kỳ từ 10.000 sản phẩm trở lên với chính sách công nợ & chiết khấu đặc biệt.
              </p>
            </div>

            <form onSubmit={handleRFQSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Tên Thương Hiệu F&B *</label>
                  <input
                    type="text"
                    required
                    value={merchantBrand}
                    onChange={(e) => setMerchantBrand(e.target.value)}
                    className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Người Phụ Trách Thu Mua *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Số Điện Thoại / Zalo B2B *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Số Lượng Đặt Hàng Dự Kiến *</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={cupQuantity}
                    onChange={(e) => setCupQuantity(Number(e.target.value))}
                    className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Địa Chỉ Giao Hàng / Kho Tổng *</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Ghi Chú Kỹ Thuật & Yêu Cầu In Ấn</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={rfqSubmitted}
                className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{rfqSubmitted ? 'Đang Xử Lý Gửi RFQ...' : 'Gửi Yêu Cầu Báo Giá Chính Thức (RFQ)'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="backdrop-blur-xl bg-[#065F46]/90 text-white p-6 rounded-3xl border border-white/20 shadow-xl space-y-3">
              <h4 className="font-bold text-sm text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                Cam Kết Dịch Vụ B2B
              </h4>
              <ul className="text-xs text-emerald-100/90 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Phản hồi bảng báo giá chính thức trong vòng <strong>2 giờ làm việc</strong>.</li>
                <li>Hỗ trợ thiết kế và làm market mẫu 3D miễn phí.</li>
                <li>Giao hàng tận nơi toàn quốc, hỗ trợ chia đợt giao định kỳ hàng tuần.</li>
                <li>Hỗ trợ kết nối máy POS để kích hoạt chương trình Loyalty cho khách của quán.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAMPLE KIT */}
      {b2bTab === 'sample_kit' && (
        <div className="backdrop-blur-xl bg-white/60 p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#065F46] flex items-center justify-center mx-auto shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Đăng Ký Nhận Bộ Mẫu Thử (Sample Kit) Miễn Phí</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Trải nghiệm độ bền, khả năng chịu nhiệt và chất lượng dập nổi thực tế trước khi ký kết hợp đồng sỉ.
            </p>
          </div>

          {sampleKitSubmitted ? (
            <div className="p-6 rounded-2xl backdrop-blur-md bg-emerald-50/80 border border-emerald-200/80 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto" />
              <h4 className="font-bold text-[#065F46] text-sm">Đã Tiếp Nhận Yêu Cầu Gửi Mẫu Thử!</h4>
              <p className="text-xs text-slate-600">
                EcoPack sẽ chuẩn bị bộ Kit (Ly bã mía 500ml/700ml, Hộp 2 ngăn, Ống hút cỏ) và bàn giao cho đơn vị chuyển phát nhanh đến địa chỉ của bạn trong 24-48h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSampleKitSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Tên quán / Chuỗi cafe..."
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Họ tên người nhận..."
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại nhận hàng..."
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="Email nhận thông tin tracking..."
                  className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Địa chỉ giao hàng chi tiết..."
                className="w-full p-3 rounded-2xl backdrop-blur-md bg-white/80 border border-white/70 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Gửi Bộ Sample Kit Ngay (Miễn Phí Vận Chuyển)
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
};

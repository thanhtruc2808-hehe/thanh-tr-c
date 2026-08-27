import React, { useState } from 'react';
import { 
  QrCode, 
  Award, 
  Gift, 
  History, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Leaf, 
  Smartphone, 
  Coffee, 
  TreePine, 
  ShieldCheck, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { User, EcoCup, Reward, LoyaltyTransaction } from '../../types';

interface B2CMobilePreviewProps {
  currentUser: User;
  ecoCups: EcoCup[];
  rewards: Reward[];
  transactions: LoyaltyTransaction[];
  onScanCup: (cup: EcoCup) => void;
  onRedeemReward: (reward: Reward) => void;
}

export const B2CMobilePreview: React.FC<B2CMobilePreviewProps> = ({
  currentUser,
  ecoCups,
  rewards,
  transactions,
  onScanCup,
  onRedeemReward,
}) => {
  const [b2cSubTab, setB2cSubTab] = useState<'scan' | 'wallet' | 'rewards' | 'history'>('scan');
  const [selectedCupToScan, setSelectedCupToScan] = useState<EcoCup>(ecoCups[0]);
  const [scanStatusMessage, setScanStatusMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const [redeemedVoucher, setRedeemedVoucher] = useState<{ code: string; title: string } | null>(null);

  const handleScanAction = (cup: EcoCup) => {
    if (cup.is_scanned) {
      setScanStatusMessage({
        type: 'error',
        text: `Mã QR #${cup.qr_code_hash} đã được quét trước đó vào lúc ${cup.scanned_at || 'hôm nay'}. Mỗi ly chỉ được tích điểm 01 lần!`,
      });
      return;
    }

    onScanCup(cup);
    setScanStatusMessage({
      type: 'success',
      text: `🎉 Quét thành công Ly Xanh tại "${cup.merchant_name}"! +${cup.points_value} Điểm Xanh đã cộng vào ví và giảm 45g CO2.`,
    });
  };

  const handleRedeemAction = (reward: Reward) => {
    if (currentUser.green_points_balance < reward.points_required) {
      alert(`Bạn cần thêm ${reward.points_required - currentUser.green_points_balance} điểm để đổi món quà này! Hãy thưởng thức thêm đồ uống ly xanh nhé.`);
      return;
    }

    onRedeemReward(reward);
    setRedeemedVoucher({ code: reward.discount_code, title: reward.title });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="backdrop-blur-xl bg-[#065F46]/95 text-white p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#10B981] text-xs font-semibold border border-white/20">
            <Smartphone className="w-3.5 h-3.5 text-white" /> B2C HYBRID LOYALTY & REWARDS APP
          </div>
          <h2 className="text-xl font-bold text-white">Ví Tiêu Dùng Xanh & Quét Mã Đáy Ly EcoCup</h2>
          <p className="text-xs text-emerald-100/80">
            Tích điểm nhận quà độc quyền khi dùng ly bã mía/PLA tại các quán cafe đối tác.
          </p>
        </div>

        {/* Mobile View Nav Buttons */}
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 p-1.5 rounded-2xl border border-white/15">
          {[
            { id: 'scan', label: 'Quét QR Ly', icon: QrCode },
            { id: 'wallet', label: 'Ví Điểm', icon: Award },
            { id: 'rewards', label: 'Đổi Quà', icon: Gift },
            { id: 'history', label: 'Lịch Sử', icon: History },
          ].map(tab => {
            const Icon = tab.icon;
            const active = b2cSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setB2cSubTab(tab.id as any);
                  setScanStatusMessage({ type: null, text: '' });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  active ? 'bg-[#10B981] text-white shadow-md shadow-emerald-500/20' : 'text-emerald-100/80 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-VIEW 1: CAMERA QR SCANNER SIMULATOR */}
      {b2cSubTab === 'scan' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Scanner Viewport */}
          <div className="md:col-span-7 backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#10B981]" />
                Trình Quét Mã QR Ly Xanh (Camera View)
              </span>
              <span className="text-[11px] font-mono text-[#065F46] backdrop-blur-md bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 font-semibold">
                Anti-Fraud Engine Active
              </span>
            </div>

            {/* Simulated Camera Feed */}
            <div className="relative aspect-square sm:aspect-4/3 rounded-2xl bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-6 border-4 border-slate-800 text-center shadow-inner">
              
              {/* Scan Reticle Focus Box */}
              <div className="w-48 h-48 rounded-2xl border-2 border-emerald-400 relative flex items-center justify-center animate-pulse">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-500"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-500"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-500"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-500"></div>
                
                {/* Laser scanline */}
                <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_#34d399] absolute top-1/2 -translate-y-1/2"></div>
                
                <div className="text-[10px] font-mono text-emerald-300 bg-slate-900/90 px-2 py-1 rounded">
                  HƯỚNG CAMERA VÀO ĐÁY LY
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Mỗi chiếc ly bã mía được khắc 01 mã định danh duy nhất chống trùng lặp.
              </p>
            </div>

            {/* Status Alert Banner */}
            {scanStatusMessage.type && (
              <div className={`p-4 rounded-2xl text-xs flex items-start gap-2.5 backdrop-blur-md ${
                scanStatusMessage.type === 'success'
                  ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50/90 text-rose-900 border border-rose-200'
              }`}>
                {scanStatusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>{scanStatusMessage.text}</div>
              </div>
            )}
          </div>

          {/* Interactive Test Cups to Scan */}
          <div className="md:col-span-5 backdrop-blur-xl bg-white/50 p-6 rounded-3xl border border-white/50 shadow-xl space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Thử Nghiệm Quét Mã Ly Mẫu</h4>
              <p className="text-xs text-slate-500">Chọn một mã ly dưới đây để kiểm tra luồng tích điểm:</p>
            </div>

            <div className="space-y-2.5">
              {ecoCups.map((cup) => (
                <div
                  key={cup.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    cup.is_scanned
                      ? 'backdrop-blur-sm bg-white/40 border-white/40 opacity-60'
                      : 'backdrop-blur-md bg-white/80 border-white/70 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{cup.merchant_name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{cup.cup_type} • #{cup.qr_code_hash}</div>
                    </div>
                    <span className="font-bold font-mono text-[#065F46] text-xs">
                      +{cup.points_value} pts
                    </span>
                  </div>

                  <button
                    onClick={() => handleScanAction(cup)}
                    disabled={cup.is_scanned}
                    className={`w-full mt-2.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cup.is_scanned
                        ? 'bg-slate-200/80 text-slate-500 cursor-not-allowed'
                        : 'bg-[#10B981] hover:bg-[#059669] text-white shadow-xs shadow-emerald-500/20'
                    }`}
                  >
                    {cup.is_scanned ? '✓ Đã quét trước đó' : 'Quét Mã Ly Này Ngay'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3.5 backdrop-blur-md bg-teal-50/80 rounded-2xl border border-teal-200/70 text-[11px] text-teal-900 space-y-1 shadow-xs">
              <div className="font-bold text-[#065F46]">Đồng Bộ Tự Động Với Máy POS:</div>
              <p className="text-teal-800/90 leading-relaxed">
                Khi thanh toán tại KiotViet/iPOS, số điểm sẽ tự động được tích vào số điện thoại {currentUser.phone} mà không cần quét mã.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: GREEN WALLET */}
      {b2cSubTab === 'wallet' && (
        <div className="space-y-6">
          {/* Main Wallet Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-[#065F46]/95 via-[#044734]/95 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Chủ tài khoản</span>
                <h3 className="font-bold text-lg text-white">{currentUser.full_name}</h3>
                <p className="text-xs text-emerald-200 font-mono">{currentUser.phone}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Leaf className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>

            {/* Big Points Number */}
            <div className="pt-2">
              <span className="text-xs text-emerald-200 font-medium">Số Dư Điểm Xanh (Green Points)</span>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight mt-1 text-white">
                {currentUser.green_points_balance} <span className="text-xl font-sans font-normal text-emerald-200">pts</span>
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20 text-xs">
              <div className="backdrop-blur-md bg-white/10 p-3.5 rounded-2xl border border-white/15">
                <span className="text-emerald-200 text-[11px]">CO₂ Bạn Đã Cắt Giảm</span>
                <div className="font-bold text-base font-mono mt-0.5 text-white">{currentUser.lifetime_co2_saved_kg} kg CO₂</div>
              </div>
              <div className="backdrop-blur-md bg-white/10 p-3.5 rounded-2xl border border-white/15">
                <span className="text-emerald-200 text-[11px]">Số Ly Xanh Đã Dùng</span>
                <div className="font-bold text-base font-mono mt-0.5 text-white">{currentUser.total_cups_diverted} chiếc</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: REDEMPTION MARKETPLACE */}
      {b2cSubTab === 'rewards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Cửa Hàng Đổi Quà Sinh Thái</h3>
              <p className="text-xs text-slate-500">Đổi điểm lấy voucher đồ uống hoặc quà tặng tái sử dụng</p>
            </div>
            <div className="text-xs font-bold font-mono backdrop-blur-md bg-white/80 text-[#065F46] px-3.5 py-1.5 rounded-2xl border border-white/60 shadow-xs">
              Số dư: {currentUser.green_points_balance} pts
            </div>
          </div>

          {/* Reward Success Modal Banner */}
          {redeemedVoucher && (
            <div className="p-4 backdrop-blur-md bg-emerald-50/90 border border-emerald-200/80 rounded-2xl space-y-2 animate-in fade-in shadow-xs">
              <div className="flex items-center justify-between">
                <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  Đổi Quà Thành Công: {redeemedVoucher.title}
                </div>
                <button
                  onClick={() => setRedeemedVoucher(null)}
                  className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Mã voucher của bạn:</div>
                  <div className="font-mono font-bold text-base text-[#065F46]">{redeemedVoucher.code}</div>
                </div>
                <span className="text-xs bg-[#10B981] text-white px-3 py-1.5 rounded-lg font-bold">
                  Sử dụng ngay
                </span>
              </div>
            </div>
          )}

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rewards.map(rew => (
              <div key={rew.id} className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between p-4 space-y-3">
                <div className="space-y-2">
                  <img
                    src={rew.image_url}
                    alt={rew.title}
                    className="w-full h-36 object-cover rounded-2xl"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#065F46] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      {rew.reward_type === 'drink_voucher' ? 'Voucher Đồ Uống' : rew.reward_type === 'merchandise' ? 'Quà Tặng Eco' : 'Trồng Cây Rừng'}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-1 line-clamp-1">{rew.title}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{rew.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/40 flex items-center justify-between">
                  <span className="font-black font-mono text-[#065F46] text-sm">
                    {rew.points_required} pts
                  </span>
                  <button
                    onClick={() => handleRedeemAction(rew)}
                    className="py-2 px-3.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-xs shadow-emerald-500/20 cursor-pointer"
                  >
                    Đổi Quà
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: LOYALTY HISTORY */}
      {b2cSubTab === 'history' && (
        <div className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/50 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Nhật Ký Tích Điểm & Đóng Góp Môi Trường</h3>
          
          <div className="divide-y divide-white/40">
            {transactions.map(tx => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                    tx.points > 0 ? 'bg-emerald-100/80 text-[#065F46]' : 'bg-rose-100/80 text-rose-700'
                  }`}>
                    {tx.points > 0 ? <Leaf className="w-4 h-4" /> : <Gift className="w-4 h-4 text-rose-600" />}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{tx.title}</div>
                    <div className="text-[10px] text-slate-500">{tx.description} • {tx.created_at}</div>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className={`font-bold text-xs ${tx.points > 0 ? 'text-[#065F46]' : 'text-rose-600'}`}>
                    {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                  </div>
                  {tx.co2_saved_kg > 0 && (
                    <div className="text-[10px] text-slate-400">-{tx.co2_saved_kg * 1000}g CO₂</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

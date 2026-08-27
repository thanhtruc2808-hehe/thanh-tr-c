import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Calculator, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Product, ActiveView } from '../../types';

interface ProductCatalogPreviewProps {
  products: Product[];
  setActiveView: (view: ActiveView) => void;
  onSelectProductForRFQ?: (product: Product) => void;
}

export const ProductCatalogPreview: React.FC<ProductCatalogPreviewProps> = ({
  products,
  setActiveView,
  onSelectProductForRFQ,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeQuantities, setActiveQuantities] = useState<Record<string, number>>({
    prod_001: 5000,
    prod_002: 10000,
    prod_003: 10000,
    prod_004: 5000,
  });

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const getTierPriceForQuantity = (product: Product, qty: number) => {
    if (!product.tier_pricings || product.tier_pricings.length === 0) {
      return product.base_price;
    }
    // Find matching tier
    const matchedTier = product.tier_pricings.find(tier => {
      if (tier.max_quantity === null || tier.max_quantity === undefined) {
        return qty >= tier.min_quantity;
      }
      return qty >= tier.min_quantity && qty <= tier.max_quantity;
    });

    return matchedTier ? matchedTier.price_per_unit : product.base_price;
  };

  const handleQuantityChange = (productId: string, qty: number) => {
    setActiveQuantities(prev => ({ ...prev, [productId]: Math.max(1000, qty) }));
  };

  return (
    <section id="catalog-section" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#065F46] uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-[#10B981]" /> Danh mục sản phẩm nổi bật
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bao Bì Phân Hủy Sinh Học Cho F&B
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              100% không hạt vi nhựa, phân hủy tự nhiên từ 30 - 180 ngày. Tự động tính giá sỉ phân tầng theo số lượng đặt hàng.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'cups', label: 'Ly Bã Mía & PLA' },
              { id: 'straws', label: 'Ống Hút Cỏ Bàng' },
              { id: 'takeaway_boxes', label: 'Hộp Cơm Bã Mía' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#10B981] text-white shadow-md shadow-emerald-500/20'
                    : 'backdrop-blur-md bg-white/70 text-slate-700 hover:bg-white border border-white/60 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const currentQty = activeQuantities[product.id] || product.moq;
            const unitPrice = getTierPriceForQuantity(product, currentQty);
            const totalPrice = unitPrice * currentQty;
            const savingsPercent = Math.round(((product.base_price - unitPrice) / product.base_price) * 100);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="backdrop-blur-xl bg-white/60 hover:bg-white/80 rounded-3xl border border-white/50 overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image & Badges */}
                  <div className="relative aspect-4/3 bg-slate-100/60 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981] text-white shadow-xs">
                        {product.material_type === 'sugarcane_bagasse' ? 'Bã Mía 100%' : product.material_type === 'pla_cornstarch' ? 'PLA Tinh Bột Bắp' : 'Cỏ Bàng Tự Nhiên'}
                      </span>
                      {product.is_customizable && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                          In Logo Theo Yêu Cầu
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 text-slate-800 shadow-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#10B981]" />
                      <span>{product.biodegradation_days} ngày phân hủy</span>
                    </div>
                  </div>

                  {/* Product Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <div className="text-[11px] font-mono font-semibold text-slate-400">SKU: {product.sku}</div>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tier Price Calculator Box */}
                    <div className="backdrop-blur-md bg-white/70 p-3.5 rounded-2xl border border-white/60 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Số lượng đặt sỉ:</span>
                        <span className="font-bold font-mono text-[#065F46]">{currentQty.toLocaleString('vi-VN')} chiếc</span>
                      </div>

                      {/* Quantity Preset Buttons */}
                      <div className="grid grid-cols-4 gap-1">
                        {[1000, 5000, 10000, 50000].map(qty => (
                          <button
                            key={qty}
                            onClick={() => handleQuantityChange(product.id, qty)}
                            className={`py-1 rounded-xl text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                              currentQty === qty
                                ? 'bg-[#10B981] text-white shadow-xs'
                                : 'bg-white/80 text-slate-700 hover:bg-white border border-white/60'
                            }`}
                          >
                            {qty >= 1000 ? `${qty / 1000}k` : qty}
                          </button>
                        ))}
                      </div>

                      {/* Computed Price */}
                      <div className="pt-1 flex items-baseline justify-between border-t border-slate-200/60">
                        <div>
                          <span className="text-sm font-extrabold text-slate-900 font-mono">
                            {unitPrice.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-[10px] text-slate-500"> / chiếc</span>
                        </div>
                        {savingsPercent > 0 && (
                          <span className="text-[10px] font-bold text-[#065F46] bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            Tiết kiệm {savingsPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      onSelectProductForRFQ?.(product);
                      setActiveView('b2b_portal');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#065F46] hover:bg-[#044734] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Xem Mockup & Yêu Cầu Báo Giá</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Frosted Glass Banner */}
        <div className="backdrop-blur-xl bg-[#065F46]/90 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">Bạn Muốn Thử Nghiệm Chất Liệu Trước Khi Đặt Hàng Số Lượng Lớn?</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              Đăng ký ngay để nhận <strong>Bộ Mẫu Thử (Sample Kit) miễn phí</strong> gồm đầy đủ các mẫu Ly Bã Mía, Ly PLA, Hộp cơm và Ống Hút gửi tận quán.
            </p>
          </div>
          <button
            onClick={() => setActiveView('b2b_portal')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            Nhận Sample Kit Miễn Phí →
          </button>
        </div>

      </div>
    </section>
  );
};

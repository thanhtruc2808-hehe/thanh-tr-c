import React, { useState } from 'react';
import { 
  Leaf, 
  Store, 
  QrCode, 
  ShieldCheck, 
  FileCode2, 
  Home, 
  Sparkles, 
  Menu, 
  X, 
  Award, 
  ChevronDown,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { ActiveView, UserRole, User } from '../../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: User;
  onRoleChange?: (role: UserRole) => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currentUser,
  onRoleChange,
  cartCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    {
      id: 'landing' as ActiveView,
      label: 'Trang Chủ & Tác Động',
      icon: Home,
      badge: 'Public',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'b2b_portal' as ActiveView,
      label: 'B2B Wholesale Portal',
      icon: Store,
      badge: 'Quán & Chuỗi F&B',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'b2c_app' as ActiveView,
      label: 'B2C Loyalty & QR App',
      icon: QrCode,
      badge: 'Khách Tiêu Dùng',
      badgeColor: 'bg-lime-100 text-lime-800',
    },
    {
      id: 'admin_portal' as ActiveView,
      label: 'Super Admin Portal',
      icon: ShieldCheck,
      badge: 'Quản Trị',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'schema_docs' as ActiveView,
      label: 'Kiến Trúc & SQL Schema',
      icon: FileCode2,
      badge: 'BƯỚC 1 Specs',
      badgeColor: 'bg-emerald-900 text-emerald-200',
    },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 backdrop-blur-xl bg-white/50 border-b border-white/30 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo-btn"
            onClick={() => setActiveView('landing')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#10B981] flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#065F46] font-sans">
                  ECOREWARD<span className="text-[#10B981] font-light">.OS</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-300/40 backdrop-blur-xs">
                  F&B GREEN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Eco Packaging & Loyalty Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links / Role Switcher Tabs */}
          <nav id="desktop-nav-tabs" className="hidden xl:flex items-center bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/40 shadow-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveView(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white/90 text-[#065F46] shadow-sm font-bold border border-white/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Quick Switcher & User Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Context Indicator */}
            {activeView === 'b2c_app' ? (
              <div 
                id="consumer-points-pill"
                onClick={() => setActiveView('b2c_app')}
                className="flex items-center gap-1.5 backdrop-blur-md bg-white/70 border border-white/60 text-[#065F46] px-3.5 py-2 rounded-full cursor-pointer hover:bg-white transition-all shadow-xs"
                title="Số điểm tích lũy của bạn"
              >
                <Award className="w-4 h-4 text-[#10B981]" />
                <div className="text-left">
                  <div className="text-[10px] text-emerald-600 font-medium leading-none">Ví Điểm Xanh</div>
                  <div className="text-xs font-bold font-mono text-slate-800">{currentUser.green_points_balance} pts</div>
                </div>
              </div>
            ) : (
              <div 
                id="b2b-cart-pill"
                onClick={() => setActiveView('b2b_portal')}
                className="flex items-center gap-1.5 backdrop-blur-md bg-white/70 border border-white/60 text-[#065F46] px-3.5 py-2 rounded-full cursor-pointer hover:bg-white transition-all shadow-xs"
                title="B2B Wholesale Giỏ Hàng"
              >
                <ShoppingBag className="w-4 h-4 text-[#10B981]" />
                <div className="text-left">
                  <div className="text-[10px] text-[#065F46] font-medium leading-none">Báo Giá / Mẫu Thử</div>
                  <div className="text-xs font-bold font-mono text-slate-800">B2B Portal</div>
                </div>
              </div>
            )}

            {/* Quick Role & Identity Switcher */}
            <div className="relative">
              <button
                id="user-profile-menu-button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md bg-white/70 hover:bg-white border border-white/60 transition-all cursor-pointer shadow-xs"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.full_name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {currentUser.full_name.split(' ')[0]} {currentUser.full_name.split(' ')[1] || ''}
                  </div>
                  <div className="text-[10px] text-[#10B981] font-medium capitalize">
                    {currentUser.role === 'consumer' ? '🌿 Consumer' : currentUser.role === 'merchant' ? '☕ F&B Merchant' : '⚡ Super Admin'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Switcher Dropdown */}
              {userDropdownOpen && (
                <div 
                  id="user-role-dropdown"
                  className="absolute right-0 mt-2 w-72 backdrop-blur-2xl bg-white/90 rounded-3xl shadow-2xl border border-white/60 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 bg-emerald-50/60 rounded-2xl mb-2 border border-emerald-100/50">
                    <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">Đang xem dưới vai trò:</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{currentUser.full_name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Chuyển Persona trải nghiệm:
                  </p>
                  
                  <div className="space-y-1">
                    <button
                      id="switch-to-consumer-role"
                      onClick={() => {
                        onRoleChange?.('consumer');
                        setActiveView('b2c_app');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        currentUser.role === 'consumer' ? 'bg-emerald-100/70 text-emerald-900 font-semibold' : 'hover:bg-white/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">🌿</span>
                        <div>
                          <div>Khách tiêu dùng (B2C)</div>
                          <div className="text-[10px] text-slate-400 font-normal">Quét QR tích điểm, đổi quà</div>
                        </div>
                      </div>
                      {currentUser.role === 'consumer' && <span className="text-[#10B981] font-bold">✓</span>}
                    </button>

                    <button
                      id="switch-to-merchant-role"
                      onClick={() => {
                        onRoleChange?.('merchant');
                        setActiveView('b2b_portal');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        currentUser.role === 'merchant' ? 'bg-emerald-100/70 text-emerald-900 font-semibold' : 'hover:bg-white/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-teal-100 text-teal-800">☕</span>
                        <div>
                          <div>Quán / Chuỗi F&B (B2B)</div>
                          <div className="text-[10px] text-slate-400 font-normal">Đặt sỉ bao bì, mockup logo, RFQ</div>
                        </div>
                      </div>
                      {currentUser.role === 'merchant' && <span className="text-[#10B981] font-bold">✓</span>}
                    </button>

                    <button
                      id="switch-to-admin-role"
                      onClick={() => {
                        onRoleChange?.('admin');
                        setActiveView('admin_portal');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        currentUser.role === 'admin' ? 'bg-amber-100/70 text-amber-950 font-semibold' : 'hover:bg-white/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-amber-100 text-amber-700">⚡</span>
                        <div>
                          <div>Super Admin Platform</div>
                          <div className="text-[10px] text-slate-400 font-normal">Duyệt RFQ, kho B2B, chiến dịch</div>
                        </div>
                      </div>
                      {currentUser.role === 'admin' && <span className="text-amber-600 font-bold">✓</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-white/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden border-t border-white/30 backdrop-blur-xl bg-white/90 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-semibold text-slate-400 px-3 uppercase tracking-wider">
            Phân hệ trong Hệ sinh thái:
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-menu-item-${item.id}`}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-[#065F46] font-semibold border border-emerald-200/60 shadow-xs'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#10B981]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

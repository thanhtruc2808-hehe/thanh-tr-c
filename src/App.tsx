/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveView, UserRole, User, EcoCup, Reward, Product, LoyaltyTransaction } from './types';
import { 
  INITIAL_IMPACT_METRICS, 
  MOCK_USERS, 
  MOCK_PRODUCTS, 
  MOCK_MERCHANTS, 
  MOCK_ECO_CUPS, 
  MOCK_REWARDS, 
  MOCK_LOYALTY_TRANSACTIONS, 
  MOCK_RFQS 
} from './data/mockData';

// Layout Components
import { ImpactTicker } from './components/layout/ImpactTicker';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// View Components
import { LandingHero } from './components/landing/LandingHero';
import { ProductCatalogPreview } from './components/landing/ProductCatalogPreview';
import { B2BOverviewPreview } from './components/b2b/B2BOverviewPreview';
import { B2CMobilePreview } from './components/b2c/B2CMobilePreview';
import { AdminOverviewPreview } from './components/admin/AdminOverviewPreview';
import { ArchitectureDocs } from './components/docs/ArchitectureDocs';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('consumer');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.consumer);
  const [metrics, setMetrics] = useState(INITIAL_IMPACT_METRICS);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [ecoCups, setEcoCups] = useState<EcoCup[]>(MOCK_ECO_CUPS);
  const [rewards, setRewards] = useState<Reward[]>(MOCK_REWARDS);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(MOCK_LOYALTY_TRANSACTIONS);
  const [rfqs, setRfqs] = useState(MOCK_RFQS);

  // Handle switching persona (consumer / merchant / admin)
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'consumer') setCurrentUser(MOCK_USERS.consumer);
    else if (role === 'merchant') setCurrentUser(MOCK_USERS.merchant);
    else setCurrentUser(MOCK_USERS.admin);
  };

  // Handle Interactive Eco Cup QR Scan
  const handleScanCup = (scannedCup: EcoCup) => {
    // 1. Update Cup scan state
    setEcoCups(prev => prev.map(c => 
      c.id === scannedCup.id 
        ? { ...c, is_scanned: true, scanned_at: 'Vừa xong', scanned_by_user_id: currentUser.id }
        : c
    ));

    // 2. Increment user points & CO2 savings
    const earnedPoints = scannedCup.points_value;
    const co2SavedKg = scannedCup.co2_offset_grams / 1000;

    setCurrentUser(prev => ({
      ...prev,
      green_points_balance: prev.green_points_balance + earnedPoints,
      lifetime_co2_saved_kg: Number((prev.lifetime_co2_saved_kg + co2SavedKg).toFixed(2)),
      total_cups_diverted: prev.total_cups_diverted + 1,
    }));

    // 3. Append to Loyalty Transaction Ledger
    const newTx: LoyaltyTransaction = {
      id: `tx_${Date.now()}`,
      consumer_id: currentUser.id,
      merchant_name: scannedCup.merchant_name,
      cup_id: scannedCup.id,
      points: earnedPoints,
      action_type: 'qr_scan_cup',
      co2_saved_kg: co2SavedKg,
      title: `Quét mã Ly Bã Mía #${scannedCup.qr_code_hash.slice(-5)}`,
      description: `Thưởng tiêu dùng ly xanh tại ${scannedCup.merchant_name}`,
      created_at: 'Vừa xong',
    };
    setTransactions(prev => [newTx, ...prev]);

    // 4. Update live ecosystem impact counter
    setMetrics(prev => ({
      ...prev,
      total_cups_replaced: prev.total_cups_replaced + 1,
      total_co2_avoided_kg: Number((prev.total_co2_avoided_kg + co2SavedKg).toFixed(1)),
    }));
  };

  // Handle Reward Redemption
  const handleRedeemReward = (reward: Reward) => {
    setCurrentUser(prev => ({
      ...prev,
      green_points_balance: prev.green_points_balance - reward.points_required,
    }));

    setRewards(prev => prev.map(r => 
      r.id === reward.id ? { ...r, stock: Math.max(0, r.stock - 1) } : r
    ));

    const newTx: LoyaltyTransaction = {
      id: `tx_rd_${Date.now()}`,
      consumer_id: currentUser.id,
      merchant_name: reward.merchant_name || 'EcoPack Official',
      points: -reward.points_required,
      action_type: 'reward_redeem',
      co2_saved_kg: 0,
      title: `Đổi quà: ${reward.title}`,
      description: `Mã code: ${reward.discount_code}`,
      created_at: 'Vừa xong',
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-slate-800 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900 relative overflow-x-hidden">
      {/* Frosted Glass Ambient Glowing Color Orbs */}
      <div className="fixed top-[-100px] left-[-100px] w-[550px] h-[550px] bg-[#10B981] opacity-15 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-[#065F46] opacity-15 rounded-full blur-[110px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[15%] w-[350px] h-[350px] bg-teal-400 opacity-10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* 1. Real-time Impact Ticker */}
      <div className="relative z-10">
        <ImpactTicker metrics={metrics} />
      </div>

      {/* 2. Primary Navigation Header */}
      <div className="relative z-20">
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          currentUser={currentUser}
          onRoleChange={handleRoleChange}
        />
      </div>

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-1 pb-16 xl:pb-0 relative z-10">
        {activeView === 'landing' && (
          <div>
            <LandingHero metrics={metrics} setActiveView={setActiveView} />
            <ProductCatalogPreview 
              products={products} 
              setActiveView={setActiveView} 
            />
          </div>
        )}

        {activeView === 'b2b_portal' && (
          <B2BOverviewPreview
            products={products}
            rfqs={rfqs}
          />
        )}

        {activeView === 'b2c_app' && (
          <B2CMobilePreview
            currentUser={currentUser}
            ecoCups={ecoCups}
            rewards={rewards}
            transactions={transactions}
            onScanCup={handleScanCup}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeView === 'admin_portal' && (
          <AdminOverviewPreview
            metrics={metrics}
            rfqs={rfqs}
            merchants={MOCK_MERCHANTS}
          />
        )}

        {activeView === 'schema_docs' && (
          <ArchitectureDocs />
        )}
      </main>

      {/* 4. Main Footer */}
      <div className="relative z-10">
        <Footer setActiveView={setActiveView} />
      </div>

      {/* 5. Mobile Bottom Bar Navigation */}
      <div className="relative z-30">
        <MobileNav activeView={activeView} setActiveView={setActiveView} />
      </div>
    </div>
  );
}

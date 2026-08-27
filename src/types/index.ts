export type UserRole = 'admin' | 'merchant' | 'consumer';

export type PosSystemType = 'kiotviet' | 'ipos' | 'sapo' | 'custom_api' | 'none';

export type PackagingCategory = 'cups' | 'straws' | 'takeaway_boxes' | 'cutlery' | 'bags' | 'accessories';

export type EcoMaterialType = 'sugarcane_bagasse' | 'pla_cornstarch' | 'grass_paper' | 'bamboo_fiber' | 'recycled_kraft';

export type RFQStatus = 'submitted' | 'under_review' | 'design_approved' | 'quoted' | 'contract_signed' | 'rejected';

export type OrderStatus = 'pending' | 'deposit_paid' | 'in_production' | 'quality_check' | 'shipping' | 'completed' | 'cancelled';

export type LoyaltyAction = 'qr_scan_cup' | 'pos_purchase_sync' | 'bring_own_tumbler' | 'reward_redeem' | 'bonus_campaign' | 'referral';

export interface User {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  avatar_url: string;
  role: UserRole;
  green_points_balance: number;
  lifetime_co2_saved_kg: number;
  total_cups_diverted: number;
  created_at: string;
}

export interface Merchant {
  id: string;
  user_id: string;
  brand_name: string;
  brand_slug: string;
  logo_url: string;
  cover_image_url?: string;
  tax_code?: string;
  address: string;
  city: string;
  contact_person: string;
  contact_phone: string;
  pos_system_type: PosSystemType;
  pos_api_key?: string;
  is_verified: boolean;
  tier_level: string;
  total_cups_issued: number;
  total_co2_offset_kg: number;
}

export interface TierPricing {
  id: string;
  product_id: string;
  min_quantity: number;
  max_quantity?: number | null;
  price_per_unit: number; // VND
  discount_percentage: number;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  category: PackagingCategory;
  material_type: EcoMaterialType;
  capacity_ml?: number;
  base_price: number;
  moq: number;
  images: string[];
  description: string;
  eco_certifications: string[];
  biodegradation_days: number;
  co2_reduction_percentage: number;
  in_stock_quantity: number;
  is_customizable: boolean;
  is_active: boolean;
  tier_pricings: TierPricing[];
}

export interface RFQRequest {
  id: string;
  rfq_code: string;
  merchant_id: string;
  merchant_brand: string;
  product_id?: string;
  product_title: string;
  product_details: {
    cup_size?: string;
    lid_type?: string;
    straw_type?: string;
    custom_notes?: string;
  };
  custom_logo_url?: string;
  print_colors_count: number;
  estimated_volume: number;
  target_delivery_date: string;
  delivery_address: string;
  status: RFQStatus;
  quoted_price_per_unit?: number;
  quoted_total_price?: number;
  quoted_lead_time_days?: number;
  admin_notes?: string;
  created_at: string;
}

export interface EcoCup {
  id: string;
  qr_code_hash: string;
  batch_code: string;
  merchant_id: string;
  merchant_name: string;
  points_value: number;
  co2_offset_grams: number;
  is_scanned: boolean;
  scanned_at?: string;
  scanned_by_user_id?: string;
  cup_type: string;
}

export interface LoyaltyTransaction {
  id: string;
  consumer_id: string;
  merchant_id?: string;
  merchant_name?: string;
  cup_id?: string;
  points: number; // positive or negative
  action_type: LoyaltyAction;
  co2_saved_kg: number;
  title: string;
  description: string;
  created_at: string;
}

export interface Reward {
  id: string;
  merchant_id?: string;
  merchant_name?: string;
  title: string;
  description: string;
  image_url: string;
  reward_type: 'drink_voucher' | 'merchandise' | 'tree_planting' | 'discount';
  points_required: number;
  stock: number;
  discount_code: string;
  terms_and_conditions: string;
  expires_at: string;
  is_active: boolean;
}

export interface ImpactMetrics {
  total_cups_replaced: number;
  total_co2_avoided_kg: number;
  active_merchants_count: number;
  active_consumers_count: number;
  trees_equivalent: number;
  landfill_plastic_avoided_kg: number;
}

export type ActiveView = 'landing' | 'b2b_portal' | 'b2c_app' | 'admin_portal' | 'schema_docs';

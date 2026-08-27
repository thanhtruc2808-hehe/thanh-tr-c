-- =================================================================================
-- GREEN F&B PACKAGING & ECO-REWARD PLATFORM
-- Supabase PostgreSQL Schema with Row Level Security (RLS), Triggers & Indexes
-- =================================================================================

-- 1. EXTENSIONS & CUSTOM ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Roles
CREATE TYPE user_role AS ENUM ('admin', 'merchant', 'consumer');

-- POS Integration Types
CREATE TYPE pos_type AS ENUM ('kiotviet', 'ipos', 'sapo', 'custom_api', 'none');

-- Product Categories & Materials
CREATE TYPE packaging_category AS ENUM ('cups', 'straws', 'takeaway_boxes', 'cutlery', 'bags', 'accessories');
CREATE TYPE eco_material_type AS ENUM ('sugarcane_bagasse', 'pla_cornstarch', 'grass_paper', 'bamboo_fiber', 'recycled_kraft');

-- RFQ & Order Statuses
CREATE TYPE rfq_status AS ENUM ('submitted', 'under_review', 'design_approved', 'quoted', 'contract_signed', 'rejected');
CREATE TYPE order_status AS ENUM ('pending', 'deposit_paid', 'in_production', 'quality_check', 'shipping', 'completed', 'cancelled');

-- Loyalty Action Types
CREATE TYPE loyalty_action AS ENUM ('qr_scan_cup', 'pos_purchase_sync', 'bring_own_tumbler', 'reward_redeem', 'bonus_campaign', 'referral');

-- =================================================================================
-- 2. CORE DATABASE TABLES
-- =================================================================================

-- TABLE 1: USERS (Extended profile linked to supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(30) UNIQUE,
    full_name VARCHAR(150),
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'consumer',
    green_points_balance INT NOT NULL DEFAULT 0 CHECK (green_points_balance >= 0),
    lifetime_co2_saved_kg NUMERIC(10, 3) NOT NULL DEFAULT 0.000,
    total_cups_diverted INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 2: MERCHANTS (F&B Brands, Cafes, Restaurant Chains)
CREATE TABLE IF NOT EXISTS public.merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    brand_name VARCHAR(255) NOT NULL,
    brand_slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    cover_image_url TEXT,
    tax_code VARCHAR(50),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Ho Chi Minh City',
    contact_person VARCHAR(150),
    contact_phone VARCHAR(30),
    pos_system_type pos_type NOT NULL DEFAULT 'none',
    pos_api_key TEXT,
    pos_webhook_secret TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    tier_level VARCHAR(50) DEFAULT 'green_partner',
    total_cups_issued INT NOT NULL DEFAULT 0,
    total_co2_offset_kg NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 3: PRODUCTS (Biodegradable & Eco Packaging Catalog)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category packaging_category NOT NULL,
    material_type eco_material_type NOT NULL,
    capacity_ml INT, -- e.g. 360ml (12oz), 500ml (16oz), 700ml (22oz)
    base_price NUMERIC(12, 2) NOT NULL, -- Price per single unit for base quantity
    moq INT NOT NULL DEFAULT 1000, -- Minimum Order Quantity
    images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    description TEXT,
    eco_certifications TEXT[] DEFAULT ARRAY['FDA Approved', 'BPI Certified', 'TUV Austria OK Compost Home']::TEXT[],
    biodegradation_days INT DEFAULT 90, -- decomposes in 90-180 days
    co2_reduction_percentage INT DEFAULT 72, -- % CO2 reduction vs PET/PP
    in_stock_quantity INT NOT NULL DEFAULT 100000,
    is_customizable BOOLEAN NOT NULL DEFAULT TRUE, -- Supports custom logo printing
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 4: TIER_PRICINGS (B2B Volume Wholesale Pricing Ladder)
CREATE TABLE IF NOT EXISTS public.tier_pricings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    min_quantity INT NOT NULL, -- e.g. 1000, 5000, 10000, 50000
    max_quantity INT, -- NULL means unbounded (e.g. 50000+)
    price_per_unit NUMERIC(12, 2) NOT NULL,
    discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_quantity_range CHECK (max_quantity IS NULL OR max_quantity >= min_quantity)
);

-- TABLE 5: RFQ_REQUESTS (B2B Custom Quotations & Mockup Studio)
CREATE TABLE IF NOT EXISTS public.rfq_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfq_code VARCHAR(32) UNIQUE NOT NULL,
    merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_details JSONB NOT NULL DEFAULT '{}'::jsonb, -- { cup_size: '500ml', lid_type: 'PLA flat', quantity: 20000 }
    custom_logo_url TEXT,
    mockup_preview_url TEXT,
    print_colors_count INT DEFAULT 1,
    estimated_volume INT NOT NULL,
    target_delivery_date DATE,
    delivery_address TEXT,
    status rfq_status NOT NULL DEFAULT 'submitted',
    quoted_price_per_unit NUMERIC(12, 2),
    quoted_total_price NUMERIC(14, 2),
    quoted_lead_time_days INT,
    admin_notes TEXT,
    merchant_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 6: ECO_CUPS (Unique serialized QR-coded cups for Consumer Anti-Fraud Loyalty)
CREATE TABLE IF NOT EXISTS public.eco_cups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_code_hash VARCHAR(128) UNIQUE NOT NULL, -- Cryptographic hash or tamper-proof nonce
    batch_code VARCHAR(64) NOT NULL,
    merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    points_value INT NOT NULL DEFAULT 10,
    co2_offset_grams INT NOT NULL DEFAULT 45, -- approx 45g CO2 saved per cup
    is_scanned BOOLEAN NOT NULL DEFAULT FALSE,
    scanned_at TIMESTAMPTZ,
    scanned_by_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    device_fingerprint TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 7: LOYALTY_TRANSACTIONS (Green points ledger & audit trail)
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consumer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE SET NULL,
    cup_id UUID REFERENCES public.eco_cups(id) ON DELETE SET NULL,
    points INT NOT NULL, -- Positive for rewards, negative for redemptions
    action_type loyalty_action NOT NULL,
    co2_saved_kg NUMERIC(8, 3) NOT NULL DEFAULT 0.045,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb, -- { pos_order_id: '...', reward_id: '...' }
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 8: REWARDS (Eco Redemption Marketplace)
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE SET NULL, -- NULL = Platform-wide reward
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    reward_type VARCHAR(50) NOT NULL DEFAULT 'drink_voucher', -- 'drink_voucher', 'merchandise', 'tree_planting', 'discount'
    points_required INT NOT NULL CHECK (points_required > 0),
    stock INT NOT NULL DEFAULT 100 CHECK (stock >= 0),
    discount_code VARCHAR(100),
    terms_and_conditions TEXT,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 9: B2B_ORDERS (Wholesale orders & Subscriptions)
CREATE TABLE IF NOT EXISTS public.b2b_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_code VARCHAR(32) UNIQUE NOT NULL,
    merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
    rfq_id UUID REFERENCES public.rfq_requests(id) ON DELETE SET NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal_amount NUMERIC(14, 2) NOT NULL,
    shipping_fee NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT 'bank_transfer',
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    is_recurring_subscription BOOLEAN NOT NULL DEFAULT FALSE,
    subscription_frequency VARCHAR(50), -- 'weekly', 'bi-weekly', 'monthly'
    next_delivery_date DATE,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 10: SAMPLE_KIT_REQUESTS
CREATE TABLE IF NOT EXISTS public.sample_kit_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(30) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    selected_items TEXT[] NOT NULL, -- e.g. ['Sugarcane Cup 500ml', 'PLA Cold Cup', 'Grass Straws']
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    tracking_number VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================================
-- 3. INDEXES FOR HIGH PERFORMANCE
-- =================================================================================
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_merchants_user_id ON public.merchants(user_id);
CREATE INDEX IF NOT EXISTS idx_merchants_slug ON public.merchants(brand_slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_material ON public.products(material_type);
CREATE INDEX IF NOT EXISTS idx_tier_pricings_product ON public.tier_pricings(product_id, min_quantity);
CREATE INDEX IF NOT EXISTS idx_rfq_merchant ON public.rfq_requests(merchant_id, status);
CREATE INDEX IF NOT EXISTS idx_eco_cups_hash ON public.eco_cups(qr_code_hash);
CREATE INDEX IF NOT EXISTS idx_eco_cups_merchant ON public.eco_cups(merchant_id, is_scanned);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_consumer ON public.loyalty_transactions(consumer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rewards_active ON public.rewards(is_active, points_required);
CREATE INDEX IF NOT EXISTS idx_b2b_orders_merchant ON public.b2b_orders(merchant_id, status);

-- =================================================================================
-- 4. DATABASE FUNCTIONS & AUTOMATED TRIGGERS
-- =================================================================================

-- TRIGGER: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_merchants_updated_at BEFORE UPDATE ON public.merchants FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_rfq_updated_at BEFORE UPDATE ON public.rfq_requests FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_rewards_updated_at BEFORE UPDATE ON public.rewards FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.b2b_orders FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- FUNCTION & TRIGGER: Auto-sync user balance & environmental metrics on new loyalty transaction
CREATE OR REPLACE FUNCTION process_loyalty_transaction_sync()
RETURNS TRIGGER AS $$
BEGIN
    -- Update Consumer balance and stats
    UPDATE public.users
    SET 
        green_points_balance = green_points_balance + NEW.points,
        lifetime_co2_saved_kg = lifetime_co2_saved_kg + GREATEST(0, NEW.co2_saved_kg),
        total_cups_diverted = total_cups_diverted + (CASE WHEN NEW.action_type IN ('qr_scan_cup', 'bring_own_tumbler') THEN 1 ELSE 0 END),
        updated_at = NOW()
    WHERE id = NEW.consumer_id;

    -- Update Merchant impact stats if merchant_id is present
    IF NEW.merchant_id IS NOT NULL THEN
        UPDATE public.merchants
        SET 
            total_co2_offset_kg = total_co2_offset_kg + GREATEST(0, NEW.co2_saved_kg),
            total_cups_issued = total_cups_issued + (CASE WHEN NEW.action_type = 'qr_scan_cup' THEN 1 ELSE 0 END),
            updated_at = NOW()
        WHERE id = NEW.merchant_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_loyalty_transaction_sync
AFTER INSERT ON public.loyalty_transactions
FOR EACH ROW EXECUTE FUNCTION process_loyalty_transaction_sync();

-- FUNCTION: Atomic QR Scan Redeem Procedure (prevents double-spend and race conditions)
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
    -- Lock row for update
    SELECT * INTO v_cup 
    FROM public.eco_cups 
    WHERE qr_code_hash = p_qr_hash 
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Mã QR không hợp lệ hoặc không tồn tại.');
    END IF;

    IF v_cup.is_scanned THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Mã QR này đã được quét trước đó vào lúc ' || to_char(v_cup.scanned_at, 'DD/MM/YYYY HH24:MI'));
    END IF;

    -- Mark cup as scanned
    UPDATE public.eco_cups
    SET 
        is_scanned = TRUE,
        scanned_at = NOW(),
        scanned_by_user_id = p_consumer_id,
        device_fingerprint = p_device_fingerprint
    WHERE id = v_cup.id;

    -- Insert loyalty record
    INSERT INTO public.loyalty_transactions (
        consumer_id,
        merchant_id,
        cup_id,
        points,
        action_type,
        co2_saved_kg,
        title,
        description,
        metadata
    ) VALUES (
        p_consumer_id,
        v_cup.merchant_id,
        v_cup.id,
        v_cup.points_value,
        'qr_scan_cup',
        (v_cup.co2_offset_grams::numeric / 1000.0),
        'Thưởng quét Ly Xanh EcoCup',
        'Tích ' || v_cup.points_value || ' điểm xanh và giảm thiểu 45g CO2 vào môi trường.',
        jsonb_build_object('qr_hash', p_qr_hash, 'batch', v_cup.batch_code)
    ) RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'success', TRUE,
        'points_awarded', v_cup.points_value,
        'co2_saved_kg', (v_cup.co2_offset_grams::numeric / 1000.0),
        'transaction_id', v_transaction_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =================================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tier_pricings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_cups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sample_kit_requests ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
CREATE POLICY "Users can read own profile or public info" ON public.users
    FOR SELECT USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- MERCHANTS POLICIES
CREATE POLICY "Public can view verified merchants" ON public.merchants
    FOR SELECT USING (is_verified = TRUE OR auth.uid() = user_id);

CREATE POLICY "Merchants can update own brand profile" ON public.merchants
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Merchants can insert brand profile" ON public.merchants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- PRODUCTS & TIER PRICINGS (Public Read, Admin Write)
CREATE POLICY "Everyone can view active products" ON public.products
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins full access to products" ON public.products
    FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Everyone can view tier pricing" ON public.tier_pricings
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins manage tier pricing" ON public.tier_pricings
    FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- RFQ POLICIES (Merchants manage own RFQs, Admins manage all)
CREATE POLICY "Merchants manage own RFQs" ON public.rfq_requests
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.merchants WHERE merchants.id = rfq_requests.merchant_id AND merchants.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
    );

-- ECO CUPS POLICIES
CREATE POLICY "Merchants view their assigned eco cups" ON public.eco_cups
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.merchants WHERE merchants.id = eco_cups.merchant_id AND merchants.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
    );

-- LOYALTY TRANSACTIONS POLICIES
CREATE POLICY "Consumers view own transactions" ON public.loyalty_transactions
    FOR SELECT USING (consumer_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- REWARDS POLICIES
CREATE POLICY "Everyone can view active rewards" ON public.rewards
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins manage rewards" ON public.rewards
    FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- B2B ORDERS POLICIES
CREATE POLICY "Merchants view and create own orders" ON public.b2b_orders
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.merchants WHERE merchants.id = b2b_orders.merchant_id AND merchants.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
    );

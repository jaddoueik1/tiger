/*
  # Create Product Categories and Products Tables

  1. New Tables
    - `product_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text, optional)
      - `parent_id` (uuid, optional, self-referencing)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `sku` (text, unique)
      - `title` (text)
      - `description` (text)
      - `category_id` (uuid, foreign key to product_categories)
      - `images` (jsonb, array of image URLs)
      - `price` (numeric)
      - `compare_at_price` (numeric, optional)
      - `stock` (integer)
      - `variants` (jsonb, optional)
      - `attributes` (jsonb, optional)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for active products and categories
    - Admin-only write access

  3. Indexes
    - Index on category_id for fast product lookups
    - Index on slug for category lookups
    - Index on sku for product lookups
*/

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  images jsonb DEFAULT '[]'::jsonb,
  price numeric(10, 2) NOT NULL,
  compare_at_price numeric(10, 2),
  stock integer DEFAULT 0,
  variants jsonb DEFAULT '[]'::jsonb,
  attributes jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_categories
CREATE POLICY "Anyone can view categories"
  ON product_categories
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  TO public
  USING (is_active = true);

-- Insert sample categories
INSERT INTO product_categories (id, name, slug, description) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Gi & Uniforms', 'gi-uniforms', 'Traditional training uniforms and gi'),
  ('22222222-2222-2222-2222-222222222222', 'Gloves & Protection', 'gloves-protection', 'Boxing gloves, shin guards, and protective gear'),
  ('33333333-3333-3333-3333-333333333333', 'Apparel', 'apparel', 'Training apparel and casual wear'),
  ('44444444-4444-4444-4444-444444444444', 'Accessories', 'accessories', 'Training accessories and equipment'),
  ('55555555-5555-5555-5555-555555555555', 'Supplements', 'supplements', 'Nutritional supplements and recovery products')
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO products (sku, title, description, category_id, images, price, compare_at_price, stock) VALUES
  ('TMT-GI-001', 'Tiger Muay Thai Premium Gi', 'High-quality traditional gi with reinforced stitching. Perfect for training and competition.', '11111111-1111-1111-1111-111111111111', '["https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"]'::jsonb, 89.99, 119.99, 25),
  ('TMT-GLOVE-001', 'Professional Boxing Gloves 16oz', 'Premium leather boxing gloves with superior padding and wrist support.', '22222222-2222-2222-2222-222222222222', '["https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg"]'::jsonb, 129.99, 159.99, 30),
  ('TMT-SHIN-001', 'Shin Guards Pro Series', 'Lightweight and durable shin guards with extended foot protection.', '22222222-2222-2222-2222-222222222222', '["https://images.pexels.com/photos/8612987/pexels-photo-8612987.jpeg"]'::jsonb, 69.99, NULL, 40),
  ('TMT-SHIRT-001', 'Tiger Training T-Shirt', 'Breathable performance t-shirt with moisture-wicking fabric.', '33333333-3333-3333-3333-333333333333', '["https://images.pexels.com/photos/8205562/pexels-photo-8205562.jpeg"]'::jsonb, 29.99, 39.99, 100),
  ('TMT-SHORTS-001', 'Muay Thai Shorts - Classic', 'Traditional Muay Thai shorts with authentic Thai craftsmanship.', '33333333-3333-3333-3333-333333333333', '["https://images.pexels.com/photos/7991666/pexels-photo-7991666.jpeg"]'::jsonb, 44.99, NULL, 60),
  ('TMT-WRAP-001', 'Hand Wraps 180"', 'Professional grade hand wraps for ultimate wrist and knuckle protection.', '44444444-4444-4444-4444-444444444444', '["https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg"]'::jsonb, 12.99, NULL, 150),
  ('TMT-BAG-001', 'Gym Duffel Bag', 'Spacious duffel bag with separate compartments for gear and shoes.', '44444444-4444-4444-4444-444444444444', '["https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"]'::jsonb, 54.99, 69.99, 35),
  ('TMT-PROTEIN-001', 'Whey Protein Isolate 2lb', 'Premium whey protein isolate for muscle recovery and growth.', '55555555-5555-5555-5555-555555555555', '["https://images.pexels.com/photos/4021867/pexels-photo-4021867.jpeg"]'::jsonb, 49.99, NULL, 80),
  ('TMT-BCAA-001', 'BCAA Recovery Formula', 'Essential amino acids for muscle recovery and endurance.', '55555555-5555-5555-5555-555555555555', '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]'::jsonb, 34.99, 44.99, 70),
  ('TMT-HEADGEAR-001', 'Training Headgear', 'Protective headgear with excellent visibility and comfort.', '22222222-2222-2222-2222-222222222222', '["https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg"]'::jsonb, 79.99, NULL, 20),
  ('TMT-HOODIE-001', 'Tiger Logo Hoodie', 'Comfortable cotton blend hoodie with Tiger Muay Thai logo.', '33333333-3333-3333-3333-333333333333', '["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"]'::jsonb, 59.99, 74.99, 45),
  ('TMT-MOUTH-001', 'Custom Fit Mouthguard', 'Moldable mouthguard for maximum protection and comfort.', '44444444-4444-4444-4444-444444444444', '["https://images.pexels.com/photos/6253919/pexels-photo-6253919.jpeg"]'::jsonb, 24.99, NULL, 90)
ON CONFLICT (sku) DO NOTHING;

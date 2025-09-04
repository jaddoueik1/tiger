import { Product, ProductCategory } from '../types';

export const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Gi & Uniforms',
    slug: 'gi-uniforms',
    description: 'Traditional martial arts uniforms and gis'
  },
  {
    id: '2',
    name: 'Gloves & Protection',
    slug: 'gloves-protection',
    description: 'Protective gear for safe training'
  },
  {
    id: '3',
    name: 'Apparel',
    slug: 'apparel',
    description: 'Training clothes and casual wear'
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Training accessories and equipment'
  },
  {
    id: '5',
    name: 'Supplements',
    slug: 'supplements',
    description: 'Nutrition and recovery supplements'
  }
];

export const products: Product[] = [
  {
    id: '1',
    sku: 'BJJ-GI-001',
    title: 'Premium BJJ Gi - White',
    description: 'High-quality Brazilian Jiu-Jitsu gi made from durable pearl weave cotton. IBJJF approved for competition.',
    categoryId: '1',
    images: [
      'https://images.pexels.com/photos/7045715/pexels-photo-7045715.jpeg'
    ],
    variants: [
      { id: 'A1', name: 'A1', price: 149, stock: 10, attributes: { size: 'A1' } },
      { id: 'A2', name: 'A2', price: 149, stock: 15, attributes: { size: 'A2' } },
      { id: 'A3', name: 'A3', price: 149, stock: 8, attributes: { size: 'A3' } }
    ],
    price: 149,
    compareAtPrice: 199,
    stock: 33,
    attributes: [
      { key: 'material', value: 'Pearl Weave Cotton' },
      { key: 'weight', value: '450 GSM' },
      { key: 'certification', value: 'IBJJF Approved' }
    ],
    isActive: true
  },
  {
    id: '2',
    sku: 'MT-GLOVES-001',
    title: 'Muay Thai Boxing Gloves',
    description: 'Professional-grade Muay Thai gloves with excellent wrist support and padding distribution.',
    categoryId: '2',
    images: [
      'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'
    ],
    variants: [
      { id: '12oz', name: '12oz', price: 89, stock: 20, attributes: { weight: '12oz' } },
      { id: '14oz', name: '14oz', price: 89, stock: 25, attributes: { weight: '14oz' } },
      { id: '16oz', name: '16oz', price: 89, stock: 18, attributes: { weight: '16oz' } }
    ],
    price: 89,
    compareAtPrice: 120,
    stock: 63,
    attributes: [
      { key: 'material', value: 'Genuine Leather' },
      { key: 'padding', value: 'Multi-layer Foam' },
      { key: 'closure', value: 'Velcro Strap' }
    ],
    isActive: true
  },
  {
    id: '3',
    sku: 'APPAREL-001',
    title: 'Tiger Muay Thai Training Shirt',
    description: 'Moisture-wicking training shirt with the Tiger Muay Thai logo. Perfect for intense training sessions.',
    categoryId: '3',
    images: [
      'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg'
    ],
    variants: [
      { id: 'S', name: 'Small', price: 35, stock: 30, attributes: { size: 'S' } },
      { id: 'M', name: 'Medium', price: 35, stock: 40, attributes: { size: 'M' } },
      { id: 'L', name: 'Large', price: 35, stock: 35, attributes: { size: 'L' } },
      { id: 'XL', name: 'X-Large', price: 35, stock: 25, attributes: { size: 'XL' } }
    ],
    price: 35,
    stock: 130,
    attributes: [
      { key: 'material', value: 'Polyester Blend' },
      { key: 'features', value: 'Moisture-wicking' },
      { key: 'fit', value: 'Athletic Cut' }
    ],
    isActive: true
  },
  {
    id: '4',
    sku: 'ACC-WRAPS-001',
    title: 'Hand Wraps - Black',
    description: 'Professional hand wraps for boxing and Muay Thai training. 180 inches of durable cotton blend.',
    categoryId: '4',
    images: [
      'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg'
    ],
    variants: [],
    price: 15,
    stock: 100,
    attributes: [
      { key: 'length', value: '180 inches' },
      { key: 'material', value: 'Cotton Blend' },
      { key: 'closure', value: 'Thumb Loop & Velcro' }
    ],
    isActive: true
  },
  {
    id: '5',
    sku: 'SUPP-PROTEIN-001',
    title: 'Whey Protein Powder - Vanilla',
    description: 'High-quality whey protein isolate for muscle recovery and growth. 25g protein per serving.',
    categoryId: '5',
    images: [
      'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'
    ],
    variants: [
      { id: '1lb', name: '1 lb', price: 45, stock: 25, attributes: { size: '1 lb' } },
      { id: '2lb', name: '2 lb', price: 75, stock: 30, attributes: { size: '2 lb' } },
      { id: '5lb', name: '5 lb', price: 150, stock: 15, attributes: { size: '5 lb' } }
    ],
    price: 45,
    compareAtPrice: 60,
    stock: 70,
    attributes: [
      { key: 'protein_per_serving', value: '25g' },
      { key: 'flavor', value: 'Vanilla' },
      { key: 'type', value: 'Whey Isolate' }
    ],
    isActive: true
  },
  {
    id: '6',
    sku: 'PROT-SHIN-001',
    title: 'Shin Guards - Professional',
    description: 'Heavy-duty shin guards for Muay Thai and MMA training. Superior protection with mobility.',
    categoryId: '2',
    images: [
      'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'
    ],
    variants: [
      { id: 'S', name: 'Small', price: 65, stock: 12, attributes: { size: 'S' } },
      { id: 'M', name: 'Medium', price: 65, stock: 18, attributes: { size: 'M' } },
      { id: 'L', name: 'Large', price: 65, stock: 15, attributes: { size: 'L' } }
    ],
    price: 65,
    compareAtPrice: 85,
    stock: 45,
    attributes: [
      { key: 'material', value: 'Synthetic Leather' },
      { key: 'padding', value: 'High-density Foam' },
      { key: 'closure', value: 'Double Strap' }
    ],
    isActive: true
  }
];
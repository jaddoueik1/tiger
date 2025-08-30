import express from 'express';
import { categories, products } from '../data/products';
import { ApiResponse } from '../types';

const router = express.Router();

// Mock cart storage
const carts: { [userId: string]: any } = {};
const orders: any[] = [];

// GET /api/shop/categories
router.get('/categories', (req, res) => {
  const response: ApiResponse<any> = {
    data: categories,
  };
  res.json(response);
});

// GET /api/shop/products
router.get('/products', (req, res) => {
  const { query, categoryId, inStock, sort, page = 1, limit = 12 } = req.query;
  
  let filtered = products.filter(p => p.isActive);
  
  if (query) {
    const searchTerm = (query as string).toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (categoryId) {
    filtered = filtered.filter(p => p.categoryId === categoryId);
  }
  
  if (inStock === 'true') {
    filtered = filtered.filter(p => p.stock > 0);
  }
  
  // Sorting
  switch (sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name_asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // Default sort by creation (newest first)
      break;
  }
  
  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedResults = filtered.slice(startIndex, endIndex);
  
  const response: ApiResponse<any> = {
    data: paginatedResults,
    meta: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limitNum),
    },
  };
  
  res.json(response);
});

// GET /api/shop/products/:id
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  
  const product = products.find(p => p.id === id && p.isActive);
  
  if (!product) {
    return res.status(404).json({
      error: 'Product Not Found',
      message: `Product with id "${id}" not found`,
    });
  }
  
  const category = categories.find(c => c.id === product.categoryId);
  
  const response: ApiResponse<any> = {
    data: { ...product, category },
  };
  
  res.json(response);
});

// POST /api/shop/cart
router.post('/cart', (req, res) => {
  const { userId, items } = req.body;
  
  if (!userId || !items || !Array.isArray(items)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'userId and items array are required',
    });
  }
  
  // Validate and calculate cart
  const cartItems = [];
  let subtotal = 0;
  
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    
    const variant = item.variantId ? 
      product.variants.find(v => v.id === item.variantId) : null;
    
    const price = variant?.price || product.price;
    const itemTotal = price * item.quantity;
    
    cartItems.push({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      price,
      title: product.title,
      variant: variant?.name,
    });
    
    subtotal += itemTotal;
  }
  
  const cart = {
    id: Date.now().toString(),
    userId,
    items: cartItems,
    subtotal,
    tax: subtotal * 0.08, // 8% tax
    total: subtotal * 1.08,
    createdAt: new Date(),
  };
  
  carts[userId] = cart;
  
  const response: ApiResponse<any> = {
    data: cart,
  };
  
  res.json(response);
});

router.get('/whatsapp-config', (req, res) => {
  const response: ApiResponse<any> = {
    data: {
      phoneE164: "+96176061065",
      template: "Order {orderId}\n{name}\n{address}\n{email}\n{items}\nTotal: {total} {currency}",
    },
  };
  res.json(response);
});

export { router as shopRoutes };

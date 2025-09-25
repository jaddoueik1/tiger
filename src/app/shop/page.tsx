'use client';

import Button from '@/components/ui/Button';
import { useProducts } from '@/hooks/useApi';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

export const metadata = {
  title: 'Tiger Muay Thai - Shop',
  description: 'Premium martial arts gear and equipment for your training needs.',
};

export default function ShopPage() {
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    sort: '',
    page: 1,
  });

  const { data: productsData, isLoading } = useProducts(filters);
  const { pushToCart, removeFromCart, clearCart } = useCartStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-16 bg-gray-300 rounded-lg w-60 mx-auto mb-4" />
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4" />
                <div className="h-6 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
                <div className="h-10 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const products = productsData?.data || [];

  const addProductToCart = (product: any) => {
    console.log('Adding product to cart:', product);
    pushToCart({
      id: product.id || product._id || product.sku || `product-${Date.now()}`,
      name: product.title,
      price: product.price,
      image: product.images?.[0]
    }, 1);
  };

  const handleAddToCart = (product: any) => {
    addProductToCart(product);
    // Optional: Show a toast notification
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <div className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-text mb-4">
            Shop
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Premium gear and equipment for your training needs. From gi's to gloves, we've got you covered.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-xl p-6 mb-12 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.categoryId}
              onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="1">Gi & Uniforms</option>
              <option value="2">Gloves & Protection</option>
              <option value="3">Apparel</option>
              <option value="4">Accessories</option>
              <option value="5">Supplements</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.compareAtPrice && (
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
                    Save ${product.compareAtPrice - product.price}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-text">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-text-muted line-through ml-2">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-text-muted">4.8</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  {product.stock > 10 ? (
                    <span className="text-sm text-accent">In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-sm text-yellow-600">Only {product.stock} left!</span>
                  ) : (
                    <span className="text-sm text-primary">Out of Stock</span>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
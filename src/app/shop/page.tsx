'use client';

import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { useProductCategories, useProducts } from '@/hooks/useApi';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function ShopPage() {
    useEffect(() => {
        document.title = 'Tiger Muay Thai - Shop';
    }, []);

    const [filters, setFilters] = useState({
        query: '',
        categoryId: '',
        sort: '',
        page: 1,
        limit: 12,
        inStock: true,
    });

    const { data: categoriesData, isLoading: categoriesLoading } = useProductCategories();
    const { data: productsData, isLoading } = useProducts(filters);
    const { pushToCart, removeFromCart, clearCart } = useCartStore();

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Tiger Muay Thai - Shop</title>
                    <meta name="description" content="Premium gear and equipment for your training needs. From gi's to gloves, we've got you covered." />
                </Head>
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
            </>
        );
    }

    const products = productsData?.data || [];
    const categories = categoriesData?.data || [];
    const meta = productsData?.meta || { page: 1, totalPages: 1 };

    const addProductToCart = (product: any) => {
        console.log('Adding product to cart:', product);
        pushToCart({
            id: product.id || product._id || product.sku || `product-${Date.now()}`,
            name: product.title,
            price: product.price,
            image: product.images?.[0]
        }, 1);
    };

    const getCategoryByName = (name: string) => {
        const category = categories.find((cat: any) => cat.name === name);
        return category ? category._id : '';
    }

    const getCategoryById = (id: string) => {
        const category = categories.find((cat: any) => cat._id === id);
        return category ? category.name : '';
    }

    const handleAddToCart = (product: any) => {
        addProductToCart(product);
        // Optional: Show a toast notification
        console.log(`Added ${product.title} to cart`);
    };

    return (
        <>
            <Head>
                <title>Tiger Muay Thai - Shop</title>
                <meta name="description" content="Premium gear and equipment for your training needs. From gi's to gloves, we've got you covered." />
            </Head>
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

                            {/* Category Filter */}
                            <select
                                value={getCategoryById(filters.categoryId)}
                                onChange={(e) => setFilters({ ...filters, categoryId: getCategoryByName(e.target.value), page: 1 })}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                disabled={categoriesLoading}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category: any) => (
                                    <option key={category._id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Sort */}
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
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
                                        src={product.images?.[0] || 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg'}
                                        alt={product.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.compare_at_price && (
                                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
                                            Save ${(product.compare_at_price - product.price).toFixed(2)}
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
                                            <span className="text-xl font-bold text-text">${Number(product.price).toFixed(2)}</span>
                                            {product.compare_at_price && (
                                                <span className="text-sm text-text-muted line-through ml-2">
                                                    ${Number(product.compare_at_price).toFixed(2)}
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

                    {products.length === 0 && !isLoading && (
                        <div className="text-center py-16">
                            <p className="text-text-muted text-lg">
                                No products found matching your criteria.
                            </p>
                        </div>
                    )}

                    {products.length > 0 && (
                        <Pagination
                            currentPage={meta.page}
                            totalPages={meta.totalPages}
                            onPageChange={(page) => setFilters({ ...filters, page })}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Check, Zap, Phone } from 'lucide-react';
import { Product } from '@/lib/products';
import { productImages } from '@/lib/images';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store/cartStore';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Get cart action
    const addItem = useCartStore((state) => state.addItem);

    if (!product) return null;

    const images = [productImages[product.image] || product.image];

    const handleOrder = () => {
        // Navigate to order page with product details
        window.location.href = `/order?product=${encodeURIComponent(product.name)}&model=${encodeURIComponent(product.model)}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all hover:scale-110"
                            >
                                <X className="w-5 h-5 text-gray-700" />
                            </button>

                            <div className="grid md:grid-cols-2 gap-8 p-8 overflow-y-auto max-h-[90vh]">
                                {/* Left: Image Section */}
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <motion.div
                                        className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img
                                            src={images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {product.featured && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="bg-gradient-to-r from-ktm-orange to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                                                >
                                                    <Zap className="w-3 h-3" />
                                                    Featured
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Favorite Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                            />
                                        </motion.button>

                                        {/* Stock Indicator */}
                                        <div className="absolute bottom-4 right-4">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${product.inStock
                                                ? 'bg-green-500/90 text-white'
                                                : 'bg-red-500/90 text-white'
                                                }`}>
                                                {product.inStock ? (
                                                    <div className="flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        In Stock
                                                    </div>
                                                ) : (
                                                    'Out of Stock'
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right: Product Details */}
                                <div className="flex flex-col space-y-6">
                                    {/* Category & Model */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                                            {product.category}
                                        </span>
                                        <span className="text-xs px-3 py-1 bg-ktm-orange/10 text-ktm-orange rounded-full font-medium">
                                            {product.model}
                                        </span>
                                    </div>

                                    {/* Product Name */}
                                    <h2 className="text-3xl font-display font-bold text-ktm-black leading-tight">
                                        {product.name}
                                    </h2>

                                    {/* Rating */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {product.rating} ({product.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* Description */}
                                    {product.description && (
                                        <p className="text-gray-600 leading-relaxed">
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            onClick={handleOrder}
                                            disabled={!product.inStock}
                                            className="flex-1"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Phone className="w-5 h-5" />
                                                Order Now
                                            </div>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsFavorite(!isFavorite)}
                                        >
                                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                        </Button>
                                    </div>

                                    {/* Features */}
                                    <div className="pt-4 border-t space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-green-500" />
                                            100% Genuine KTM Part
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

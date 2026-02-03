'use client';

import React from 'react';
import { productImages } from '@/lib/images';
import { getFeaturedProducts } from '@/lib/products';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Get featured products from centralized data
const featuredProducts = getFeaturedProducts();

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
};

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23FF6600' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-ktm-orange to-orange-400">Products</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        100% Genuine KTM Parts - Top-rated by riders across India
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {featuredProducts.map((product) => {
                        const imageUrl = productImages[product.id] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80';

                        return (
                            <motion.div
                                key={product.id}
                                variants={item}
                                className="group"
                            >
                                <Link href={`/products/${product.id}`}>
                                    {/* Rectangular Prism Card - Skewed Design */}
                                    <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                                        {/* Main Card with 3D Effect */}
                                        <div
                                            className="relative bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden shadow-2xl"
                                            style={{
                                                clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                            }}
                                        >
                                            {/* Product Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden bg-white">
                                                <Image
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            {/* Black Name Bar at Bottom with Orange Text */}
                                            <div className="bg-black py-4 px-4">
                                                <h3 className="text-ktm-orange font-display font-bold text-base text-center italic tracking-wide">
                                                    {product.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* 3D Shadow Effect */}
                                        <div
                                            className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 blur-md -z-10"
                                            style={{
                                                clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                            }}
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/products">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-ktm-orange to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-ktm-orange/50 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Products
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

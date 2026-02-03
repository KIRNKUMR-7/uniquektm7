'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 125cc and 160cc bikes
const smallBikes = [
    {
        name: 'Duke 125',
        subtitle: '125 Duke',
        image: '/images/products/duke-200.jpg',
        link: '/products?model=Duke+125',
    },
    {
        name: 'RC 125',
        subtitle: '125 RC',
        image: '/images/products/rc-200.webp',
        link: '/products?model=RC+125',
    },
    {
        name: 'Duke 160',
        subtitle: '160 Duke',
        image: '/images/products/duke-200.jpg',
        link: '/products?model=Duke+160',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function BikeModelsSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-ktm-black mb-4">
                        125cc & 160cc <span className="text-transparent bg-clip-text bg-gradient-to-r from-ktm-orange to-orange-400">Bike Parts</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Spare parts for entry-level KTM motorcycles
                    </p>
                </motion.div>

                <motion.div
                    className="flex justify-center gap-8 md:gap-12 flex-wrap"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {smallBikes.map((bike) => (
                        <motion.div key={bike.name} variants={item}>
                            <Link href={bike.link}>
                                <div className="group cursor-pointer bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300">
                                    {/* Larger Circular Image Container */}
                                    <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-4">
                                        {/* Background circle */}
                                        <div className="absolute inset-0 rounded-full border-4 border-gray-100 group-hover:border-ktm-orange transition-colors duration-300 bg-white shadow-inner" />

                                        {/* Image container */}
                                        <div className="absolute inset-2 rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                                            <img
                                                src={bike.image}
                                                alt={bike.name}
                                                className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Orange Ring on Hover */}
                                        <div className="absolute inset-0 rounded-full ring-4 ring-ktm-orange ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Text */}
                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-800 group-hover:text-ktm-orange transition-colors text-base md:text-lg">
                                            {bike.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {bike.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

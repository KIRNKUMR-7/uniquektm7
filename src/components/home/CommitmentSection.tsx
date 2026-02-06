'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
    'We offer highly specialized bike parts tailored to your specific needs',
    'Genuine KTM factory parts and high-quality aftermarket alternatives',
    'Expert technical support from certified motorcycle professionals',
    'Fast and reliable shipping across India with secure packaging',
];

export default function CommitmentSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side - Experience Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FF6600] via-[#FF8533] to-[#FF6600] flex flex-col items-center justify-center text-white p-12 group">
                            {/* Decorative Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-110 transition-transform duration-1000"></div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <span className="text-8xl md:text-9xl font-display font-bold mb-2 tracking-tighter">14+</span>
                                <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">Years of Excellence</h3>
                                <p className="text-lg md:text-xl text-orange-200 mb-4">Since 2012 - When KTM Launched in India</p>
                                <div className="h-1 w-24 bg-white mb-6"></div>
                                <p className="text-xl md:text-2xl font-medium text-orange-50 italic">Committed to Your Bike Parts</p>
                            </motion.div>

                            {/* Corner Accents */}
                            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-xl"></div>
                            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-xl"></div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-ktm-orange/10 text-ktm-orange text-sm font-semibold mb-6">
                                Our Commitment
                            </span>

                            <h2 className="text-4xl md:text-6xl font-display font-bold text-ktm-black mb-4">
                                Committed to <span className="text-ktm-orange">Helping You</span>
                            </h2>

                            <h4 className="text-xl font-semibold text-gray-700 mb-6">
                                We are a unique motorcycle spares specialist
                            </h4>

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                At Unique KTM Spares, we go beyond just selling parts. Our comprehensive approach addresses the root causes of performance issues, ensuring lasting reliability and improved riding experience for your machine.
                            </p>

                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-ktm-orange/10 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-ktm-orange" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

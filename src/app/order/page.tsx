'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const bikeModels = [
    'Duke 125', 'Duke 160', 'Duke 200', 'Duke 250', 'Duke 390',
    'RC 125', 'RC 200', 'RC 390', 'Adventure 390'
];

function OrderForm() {
    const searchParams = useSearchParams();
    const productName = searchParams.get('product') || '';
    const productModel = searchParams.get('model') || '';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        bikeModel: productModel || '',
        product: productName,
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (productName) setFormData(prev => ({ ...prev, product: productName }));
        if (productModel) setFormData(prev => ({ ...prev, bikeModel: productModel }));
    }, [productName, productModel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', phone: '', email: '', bikeModel: '', product: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-ktm-black mb-4">
                        Order <span className="text-ktm-orange">Product</span>
                    </h1>
                    <p className="text-gray-600">
                        Fill in your details and we'll contact you to confirm your order
                    </p>
                </div>

                {productName && (
                    <div className="mb-6 p-4 bg-ktm-orange/10 rounded-xl border border-ktm-orange/30">
                        <p className="text-sm text-gray-600 mb-1">Selected Product:</p>
                        <p className="font-bold text-ktm-black">{productName}</p>
                        {productModel && (
                            <p className="text-sm text-ktm-orange">Compatible with: {productModel}</p>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors"
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors"
                            placeholder="Enter email (optional)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bike Model *
                        </label>
                        <select
                            value={formData.bikeModel}
                            onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors"
                        >
                            <option value="">Select your bike model</option>
                            {bikeModels.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            value={formData.product}
                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Notes
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-ktm-orange transition-colors resize-none"
                            placeholder="Any specific requirements or questions?"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-ktm-orange to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Sending Order...' : 'Submit Order Request'}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 p-4 bg-green-100 border border-green-500 rounded-xl text-green-700 text-center"
                        >
                            ✅ Order request sent successfully! We'll contact you soon.
                        </motion.div>
                    )}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 p-4 bg-red-100 border border-red-500 rounded-xl text-red-700 text-center"
                        >
                            ❌ Failed to send order. Please try again or call us directly.
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-gray-500 text-sm mb-2">Or call us directly:</p>
                    <a href="tel:+917010093528" className="text-xl font-bold text-ktm-orange hover:underline">
                        📞 +91 70100 93528
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-16 px-4">
                <Suspense fallback={
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                }>
                    <OrderForm />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}

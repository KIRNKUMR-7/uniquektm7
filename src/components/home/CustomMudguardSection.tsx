'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bikeModels = [
    'Duke 125', 'Duke 160', 'Duke 200', 'Duke 250', 'Duke 390',
    'RC 125', 'RC 200', 'RC 390', 'Adventure 390'
];

export default function CustomMudguardSection() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        bikeModel: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/book-mudguard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', phone: '', bikeModel: '', message: '' });
                setTimeout(() => {
                    setShowForm(false);
                    setSubmitStatus('idle');
                }, 3000);
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
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,102,0,0.1) 35px, rgba(255,102,0,0.1) 70px)`
                }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <div className="relative">
                            {/* Rhombus Container */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 47 }}
                                transition={{ duration: 0.3 }}
                                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative"
                                style={{ transform: 'rotate(45deg)' }}
                            >
                                {/* Orange Border Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-ktm-orange to-orange-600 rounded-3xl shadow-2xl shadow-orange-500/30" />

                                {/* Inner Container */}
                                <div className="absolute inset-2 bg-gray-900 rounded-2xl overflow-hidden">
                                    <img
                                        src="/images/products/Customized Rear Mudguard.jpg"
                                        alt="Customized Rear Mudguard"
                                        className="w-full h-full object-cover"
                                        style={{ transform: 'rotate(-45deg) scale(1.5)' }}
                                    />
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-ktm-orange rounded-full animate-pulse" />
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse delay-300" />
                        </div>
                    </motion.div>

                    {/* Right - Content & Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/2"
                    >
                        <span className="inline-block px-4 py-2 bg-ktm-orange/20 text-ktm-orange rounded-full text-sm font-semibold mb-4">
                            ✨ Custom Parts Available
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Customized Rear{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ktm-orange to-orange-400">
                                Mudguard
                            </span>
                        </h2>
                        <p className="text-gray-300 text-base mb-6">
                            Premium quality customized rear mudguards available for <span className="text-ktm-orange font-semibold">all KTM bike models</span>.
                            Enhance your bike's look with our stylish and durable mudguards.
                        </p>

                        <ul className="text-gray-400 space-y-2 mb-6">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-ktm-orange rounded-full"></span>
                                Compatible with Duke 125, 160, 200, 250, 390
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-ktm-orange rounded-full"></span>
                                Compatible with RC 125, 200, 390
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-ktm-orange rounded-full"></span>
                                Compatible with Adventure 390
                            </li>
                        </ul>

                        <AnimatePresence mode="wait">
                            {!showForm ? (
                                <motion.button
                                    key="cta-button"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => setShowForm(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-ktm-orange to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                                >
                                    Book for Customized Mudguard
                                </motion.button>
                            ) : (
                                <motion.form
                                    key="booking-form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name *"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ktm-orange transition-colors"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ktm-orange transition-colors"
                                        />
                                    </div>
                                    <select
                                        value={formData.bikeModel}
                                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-ktm-orange transition-colors"
                                    >
                                        <option value="" className="text-gray-900">Select Bike Model *</option>
                                        {bikeModels.map(model => (
                                            <option key={model} value={model} className="text-gray-900">{model}</option>
                                        ))}
                                    </select>
                                    <textarea
                                        placeholder="Additional Notes (optional)"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ktm-orange transition-colors resize-none"
                                    />

                                    <div className="flex gap-3">
                                        <motion.button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 border border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-ktm-orange to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Submit Booking'}
                                        </motion.button>
                                    </div>

                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                                        >
                                            ✅ Booking request sent! We'll contact you soon.
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
                                        >
                                            ❌ Failed to send. Please try again.
                                        </motion.div>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

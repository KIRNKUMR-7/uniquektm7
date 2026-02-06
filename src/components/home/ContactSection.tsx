'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactSection() {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/send-contact-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden" id="contact">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-ktm-orange/10 text-ktm-orange text-sm font-semibold mb-4"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-ktm-black mb-6"
                    >
                        Contact Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-600 text-lg"
                    >
                        Ready to start your journey to peak performance? Reach out to us today and schedule your consultation or part inquiry.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm"
                    >
                        <h3 className="text-2xl font-display font-bold text-ktm-black mb-8">Send Us a Message</h3>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-ktm-black mb-2">Message Sent!</h4>
                                <p className="text-gray-600">
                                    Thank you for reaching out. We'll get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-ktm-orange font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ktm-orange/20 focus:border-ktm-orange transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ktm-orange/20 focus:border-ktm-orange transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ktm-orange/20 focus:border-ktm-orange transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Message</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your part inquiry or service request..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ktm-orange/20 focus:border-ktm-orange transition-all resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-sm font-medium">Failed to send message. Please try again or call us directly.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-ktm-black text-white font-bold py-4 rounded-xl hover:bg-ktm-orange transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    )}
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Right Side - Contact Info & Map */}
                    <div className="space-y-8">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-sm group hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ktm-orange/10 flex items-center justify-center shrink-0 group-hover:bg-ktm-orange group-hover:text-white transition-colors text-ktm-orange">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-ktm-black mb-1">Visit Us</h4>
                                    <p className="text-gray-600 font-medium">
                                        MDS Complex, 155, Kumaragiri,<br />
                                        Salem, Tamil Nadu 636015
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-sm group hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ktm-orange/10 flex items-center justify-center shrink-0 group-hover:bg-ktm-orange group-hover:text-white transition-colors text-ktm-orange">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-ktm-black mb-1">Call Us</h4>
                                    <p className="text-gray-600 font-medium">+91 70100 93528</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-sm group hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ktm-orange/10 flex items-center justify-center shrink-0 group-hover:bg-ktm-orange group-hover:text-white transition-colors text-ktm-orange">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-ktm-black mb-1">Email Us</h4>
                                    <p className="text-gray-600 font-medium">uniquektm7@gmail.com</p>
                                </div>
                            </motion.div>
                        </div>  

                        {/* Map Overlay Image Style Layout */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-4 rounded-3xl shadow-sm overflow-hidden aspect-video relative"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15629.475225121408!2d78.14083327318042!3d11.668705359218968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf12d1395fe77%3A0xe2893ac1591f042f!2sUnique%20KTM%20spares%20and%20service!5e0!3m2!1sen!2sin!4v1738169992015!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl"
                            ></iframe>
                            <div className="absolute top-8 left-8">
                                <a
                                    href="https://maps.app.goo.gl/x9pjStrDv5VbGK7Y6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-100 hover:bg-white transition-colors text-ktm-orange font-semibold text-sm"
                                >
                                    View larger map
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

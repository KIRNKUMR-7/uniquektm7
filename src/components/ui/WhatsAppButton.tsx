'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const phoneNumber = '917010093528'; // +91 70100 93528 without + and spaces
    const message = 'Hello! Welcome to unique KTM spares and services , can you give me more details';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Chat on WhatsApp"
        >
            <svg
                viewBox="0 0 32 32"
                className="w-8 h-8 fill-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.004 0C7.165 0 0 7.165 0 16.004c0 2.818.736 5.475 2.011 7.782L.073 32l8.408-1.908a15.94 15.94 0 0 0 7.523 1.884h.004C24.839 31.976 32 24.811 32 15.972 32 7.165 24.843 0 16.[...]" />
            </svg>

            {/* Pulse animation */}
            <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
        </motion.a>
    );
}
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const phoneNumber = '917010093528'; // +91 70100 93528 without + and spaces
    const message = 'Hello! im intrested in unique KTM spares and services, can you give me more details ? ';
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
                <path d="M16.004 0C7.165 0 0 7.165 0 16.004c0 2.818.736 5.475 2.011 7.782L.073 32l8.408-1.908a15.94 15.94 0 0 0 7.523 1.884h.004C24.839 31.976 32 24.811 32 15.972 32 7.165 24.843 0 16.004 0zm0 29.385a13.377 13.377 0 0 1-6.807-1.864l-.488-.29-5.065 1.148 1.333-4.867-.318-.506a13.337 13.337 0 0 1-2.057-7.002c0-7.391 6.016-13.405 13.406-13.405 7.358 0 13.373 6.014 13.373 13.405 0 7.392-6.015 13.381-13.377 13.381zm7.339-10.025c-.403-.202-2.38-1.175-2.749-1.31-.369-.134-.637-.201-.905.202-.268.403-1.04 1.31-1.275 1.579-.235.269-.47.302-.873.1-.403-.2-1.702-.627-3.241-2-.998-.892-1.672-1.993-1.868-2.33-.196-.337-.021-.519.147-.687.151-.15.337-.403.505-.605.168-.201.224-.336.336-.563.112-.226.056-.423-.028-.592-.084-.168-.756-1.823-1.036-2.495-.273-.656-.55-.566-.756-.578-.195-.01-.42-.011-.647-.011-.226 0-.593.084-.904.403-.311.32-1.186 1.159-1.186 2.826 0 1.668 1.214 3.278 1.382 3.503.169.224 2.39 3.648 5.79 5.113.809.349 1.44.557 1.932.714.812.258 1.551.222 2.136.135.651-.097 2.005-.82 2.288-1.612.283-.791.283-1.47.198-1.612-.085-.143-.311-.227-.65-.378z" />
            </svg>

            {/* Pulse animation */}
            <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
        </motion.a>
    );
}

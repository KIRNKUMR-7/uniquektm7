'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Product categories for dropdown
const productCategories = [
    { name: '125cc Bikes (Duke/RC)', href: '/products?model=125' },
    { name: '160cc Bikes', href: '/products?model=160' },
    { name: 'Engine & Transmission', href: '/products?category=Engine+%26+Transmission' },
    { name: 'Electrical & Lighting', href: '/products?category=Electrical+%26+Lighting' },
    { name: 'Frame & Body', href: '/products?category=Frame+%26+Body' },
    { name: 'Suspension & Steering', href: '/products?category=Suspension+%26+Steering' },
    { name: 'Brakes & Wheels', href: '/products?category=Brakes+%26+Wheels' },
    { name: 'Service Parts', href: '/products?category=Service+Parts' },
    { name: 'PowerParts/Accessories', href: '/products?category=PowerParts%2FAccessories' },
];

// Service options for dropdown
const serviceOptions = [
    { name: 'General Service', href: '/services' },
    { name: 'Engine Work', href: '/services' },
    { name: 'Full Service', href: '/services' },
    { name: 'Book Now', href: '/#services' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-white/90 backdrop-blur-sm'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo with unique font for KTM */}
                        <Link href="/" className="flex items-center">
                            <motion.div
                                className="text-2xl md:text-3xl font-bold flex items-baseline"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-ktm-orange font-display tracking-wide">UNIQUE</span>
                                <span className="text-ktm-orange font-black italic text-3xl md:text-4xl mx-4" style={{ fontFamily: '"Snap ITC", Impact, "Arial Black", sans-serif', letterSpacing: '-1px' }}>KTM</span>
                                <span className="text-ktm-orange font-display tracking-wide">SPARES</span>
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-ktm-orange transition-colors font-medium relative group">
                                Home
                                <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ktm-orange group-hover:w-full transition-all duration-300" />
                            </Link>

                            {/* Products Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setProductsDropdownOpen(true)}
                                onMouseLeave={() => setProductsDropdownOpen(false)}
                            >
                                <button className="flex items-center text-gray-700 hover:text-ktm-orange transition-colors font-medium">
                                    Products
                                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {productsDropdownOpen && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link
                                                href="/products"
                                                className="block px-4 py-2 text-gray-700 hover:bg-ktm-orange/10 hover:text-ktm-orange transition-colors font-medium border-b border-gray-100"
                                            >
                                                All Products
                                            </Link>
                                            {productCategories.map((category) => (
                                                <Link
                                                    key={category.name}
                                                    href={category.href}
                                                    className="block px-4 py-2 text-gray-600 hover:bg-ktm-orange/10 hover:text-ktm-orange transition-colors"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Services Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setServicesDropdownOpen(true)}
                                onMouseLeave={() => setServicesDropdownOpen(false)}
                            >
                                <button className="flex items-center text-gray-700 hover:text-ktm-orange transition-colors font-medium">
                                    Services
                                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {servicesDropdownOpen && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {serviceOptions.map((option) => (
                                                <Link
                                                    key={option.name}
                                                    href={option.href}
                                                    className="block px-4 py-2 text-gray-600 hover:bg-ktm-orange/10 hover:text-ktm-orange transition-colors"
                                                >
                                                    {option.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="text-gray-700 hover:text-ktm-orange transition-colors font-medium relative group"
                            >
                                Contact
                                <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ktm-orange group-hover:w-full transition-all duration-300" />
                            </button>
                        </div>

                        {/* Desktop Right Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/#services">
                                <motion.button
                                    className="bg-gradient-to-r from-ktm-orange to-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book Service
                                </motion.button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90 }}
                                            animate={{ rotate: 0 }}
                                            exit={{ rotate: 90 }}
                                        >
                                            <X className="w-6 h-6 text-gray-700" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90 }}
                                            animate={{ rotate: 0 }}
                                            exit={{ rotate: -90 }}
                                        >
                                            <Menu className="w-6 h-6 text-gray-700" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white border-t border-gray-200"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="container-custom py-4 space-y-2">
                                <Link
                                    href="/"
                                    className="block px-4 py-3 hover:bg-ktm-orange/10 rounded-lg transition-colors font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>

                                {/* Mobile Products Dropdown */}
                                <div className="space-y-1">
                                    <div className="px-4 py-3 font-medium text-ktm-orange">Products</div>
                                    {productCategories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.href}
                                            className="block px-8 py-2 text-gray-600 hover:bg-ktm-orange/10 rounded-lg transition-colors text-sm"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile Services Dropdown */}
                                <div className="space-y-1">
                                    <div className="px-4 py-3 font-medium text-ktm-orange">Services</div>
                                    {serviceOptions.map((option) => (
                                        <Link
                                            key={option.name}
                                            href={option.href}
                                            className="block px-8 py-2 text-gray-600 hover:bg-ktm-orange/10 rounded-lg transition-colors text-sm"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {option.name}
                                        </Link>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-3 hover:bg-ktm-orange/10 rounded-lg transition-colors font-medium"
                                >
                                    Contact
                                </button>
                                <Link
                                    href="/#services"
                                    className="block px-4 py-3 bg-ktm-orange text-white rounded-lg font-semibold text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Book Service
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}

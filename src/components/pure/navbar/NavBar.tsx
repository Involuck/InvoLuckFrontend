'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Bars3Icon,
    XMarkIcon,
    UserIcon,
    CalendarDaysIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NavLink {
    label: string;
    href: string;
}

const links: NavLink[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Precios', href: '/precios' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contacto', href: '/contacto' }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !navRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-lg'
                : 'bg-white/90 backdrop-blur-md'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                            InvoLuck
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="relative group text-gray-700 hover:text-purple-700 transition-colors duration-200 font-medium"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ y: -1 }}
                            >
                                <span className="relative z-10">{link.label}</span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-purple-50 rounded-md opacity-0 -m-2"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link href="/auth/login">
                            <motion.button
                                className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-purple-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <UserIcon className="w-5 h-5" />
                                <span>Iniciar sesión</span>
                            </motion.button>
                        </Link>

                        <motion.button
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2 rounded-md hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <CalendarDaysIcon className="w-5 h-5" />
                            <span>Agenda una demo</span>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6 text-purple-600" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-purple-600" />
                            )}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
            >
                <motion.div
                    className="bg-white/95 backdrop-blur-lg border-t border-purple-100"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="px-4 py-4 space-y-1">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-all duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <motion.div
                            className="pt-3 border-t border-purple-100 space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                        >
                            <motion.button
                                className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors duration-200 font-medium px-4 py-3 rounded-md hover:bg-purple-50 border border-gray-200 hover:border-purple-300"
                                onClick={() => setIsOpen(false)}
                                whileTap={{ scale: 0.98 }}
                            >
                                <UserIcon className="w-5 h-5" />
                                <span>Iniciar sesión</span>
                            </motion.button>

                            <motion.button
                                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-md hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-sm"
                                onClick={() => setIsOpen(false)}
                                whileTap={{ scale: 0.98 }}
                            >
                                <CalendarDaysIcon className="w-5 h-5" />
                                <span>Agenda una demo</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Precios', href: '#precios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' }
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (href: string, event: React.MouseEvent) => {
    event.preventDefault();

    if (href === '#inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 64;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-18 items-center">
          <motion.div
            className="flex items-center space-x-3 z-50 cursor-pointer"
            onClick={(e) => scrollToSection('#inicio', e)}
          >
            <div className="relative h-18 w-auto">
              <Image
                src="/api/logo"
                alt="InvoLuck logo"
                width={50}
                height={50}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            <motion.span
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-800 to-purple-950 bg-clip-text text-transparent"
            >
              InvoLuck
            </motion.span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(link.href, e)}
                className="relative group text-gray-700 hover:text-purple-800 transition-colors duration-200 font-medium cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -1 }}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 bg-purple-50 rounded-md opacity-0 -m-2"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <motion.button
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-800 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-purple-50 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <UserIcon className="w-5 h-5" />
                <span>Iniciar sesión</span>
              </motion.button>
            </Link>

            <motion.button
              className="flex items-center space-x-2 bg-purple-800  text-white px-5 py-2 rounded-md hover:from-purple-900 hover:to-purple-950 transition-all duration-200 font-medium shadow-md hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>Agenda una demo</span>
            </motion.button>
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-colors duration-200 z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-purple-800" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-purple-800" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden h-screen fixed inset-0 bg-white backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full z-45"
          >
            <motion.div
              className="mx-4 mt-2 rounded-xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 py-4">
                <div className="space-y-1">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => scrollToSection(link.href, e)}
                      className="block px-4 py-4 text-gray-700 hover:text-purple-800 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-lg cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ paddingLeft: 8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span>{link.label}</span>
                        <motion.div
                          className="w-0 h-0.5 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full"
                          whileHover={{ width: 20 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  className="pt-4 mt-4 border-t border-gray-100 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                >
                  <Link href="/auth/login">
                    <motion.button
                      className="w-full flex items-center justify-center space-x-3 text-gray-700 hover:text-purple-800 transition-all duration-200 font-medium px-4 py-4 rounded-xl hover:bg-purple-50 border border-gray-200 hover:border-purple-300"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <UserIcon className="w-6 h-6" />
                      <span className="text-lg">Iniciar sesión</span>
                    </motion.button>
                  </Link>

                  <motion.button
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-800 to-purple-950 text-white px-4 py-4 rounded-xl hover:from-purple-900 hover:to-purple-950 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <CalendarDaysIcon className="w-6 h-6" />
                    <span className="text-lg">Agenda una demo</span>
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                  </motion.button>
                </motion.div>
                <div className="h-2"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

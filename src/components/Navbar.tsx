// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { SiInstagram, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-xl">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent transition-colors ${
                  scrolled ? "" : "text-white"
                }`}
              >
                PetCare
              </span>
            </motion.a>

            {/* Desktop Menu */}
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {LINKS.map((link, idx) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className={`px-4 py-2 rounded-lg transition-all relative group
        text-lg md:text-xl font-extrabold tracking-tight
        text-black hover:text-orange-500`} // <- mereu negru, fără ternar
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{link.title}</span>
                  <motion.div
                    className="absolute inset-0 bg-orange-50 rounded-lg -z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Us</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled
                  ? "bg-orange-50 text-orange-500"
                  : "bg-orange-50 text-orange-500"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-lg">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      PetCare
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {LINKS.map((link, idx) => (
                      <motion.a
                        key={link.title}
                        href={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                        className="block px-4 py-4 rounded-xl text-xl font-extrabold text-slate-900 hover:bg-orange-50 hover:text-orange-700 transition-all group" // CHANGED
                        onClick={() => setIsOpen(false)}
                        whileHover={{ x: 8 }}
                      >
                        <span className="flex items-center justify-between">
                          {link.title}
                          <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg"
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                    <FiArrowRight />
                  </motion.a>
                </div>

                {/* Mobile Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="p-6 border-t border-slate-200"
                >
                  <p className="text-sm font-semibold text-slate-500 mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    {SOCIAL_CTAS.map((social, idx) => {
                      const Icon = social.Component;
                      return (
                        <motion.a
                          key={idx}
                          href={social.href}
                          className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const LINKS = [
  { title: "Acasa", href: "/" },
  { title: "Echipa", href: "/echipa" },
  { title: "Servicii", href: "/servicii" },
  { title: "Contact", href: "/contact" },
];

type SocialItem = {
  Component: React.ComponentType<{ className?: string }>;
  href: string;
};

const SOCIAL_CTAS: SocialItem[] = [
  { Component: SiX, href: "#" },
  { Component: SiInstagram, href: "#" },
  { Component: SiLinkedin, href: "#" },
  { Component: SiYoutube, href: "#" },
];

export default Nav;

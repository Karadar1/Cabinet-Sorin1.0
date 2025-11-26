"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export interface Category {
    id: string;
    label: string;
    images: { src: string; alt: string }[];
}

interface ClinicGalleryProps {
    categories: Category[];
}

export default function ClinicGallery({ categories }: ClinicGalleryProps) {
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];
    const images = currentCategory.images;

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setCurrentImageIndex(0);
    };

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isFullScreen) return;

            if (e.key === "Escape") setIsFullScreen(false);
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullScreen, nextImage, prevImage]);

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Turul Clinicii
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Descoperă spațiul nostru modern, conceput pentru confortul și siguranța prietenului tău necuvântător.
                    </p>
                </div>

                {/* Mini Navbar (Tabs) */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category.id
                                ? "bg-[#224e4d] text-white shadow-lg scale-105"
                                : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Carousel Container */}
                <div
                    className="relative max-w-5xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 aspect-video md:aspect-[16/9] cursor-pointer group"
                    onClick={toggleFullScreen}
                >

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeCategory}-${currentImageIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={images[currentImageIndex].src}
                                alt={images[currentImageIndex].alt}
                                fill
                                className="object-contain transition-transform duration-700 group-hover:scale-105"
                                priority
                            />



                            {/* Hover Hint */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm rounded-full p-4">
                                <Maximize2 className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 right-6 flex gap-2 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-emerald-500 w-6" : "bg-white/60 hover:bg-white"
                                        }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Full Screen Overlay */}
                <AnimatePresence>
                    {isFullScreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
                            onClick={toggleFullScreen}
                        >
                            {/* Close Button */}
                            <button
                                onClick={toggleFullScreen}
                                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/* Main Image */}
                            <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    key={`fs-${activeCategory}-${currentImageIndex}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={images[currentImageIndex].src}
                                        alt={images[currentImageIndex].alt}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>

                                {/* Caption */}
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    <p className="text-white/90 text-xl font-medium bg-black/50 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                                        {images[currentImageIndex].alt}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Buttons (Full Screen) */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}

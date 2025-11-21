// app/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { PawPrint, Syringe, Scissors, ChevronRight } from "lucide-react";
import hero from "../../public/hero4.jpg";
import about from "../../public/hero2.png";
import ServiceCard from "@/components/ServiceCards";
import ClinicGallery from "@/components/ClinicGallery";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* 
        HERO SECTION 
        - Changed h-screen to min-h-[100svh] for better mobile browser support 
      */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={hero}
            alt="Two happy bulldogs in a park"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient Overlay: Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col h-full pt-32 pb-8 md:pt-40 md:pb-12">

          {/* Text Area */}
          <div className="flex-1 flex flex-col justify-center md:justify-start md:mt-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] drop-shadow-lg tracking-tight">
                Because they aren't <br className="hidden sm:block" />
                just pets,
                <span className="block text-emerald-400 mt-2">they are family.</span>
              </h1>

              <p className="mt-6 text-lg text-gray-200 max-w-xl font-medium drop-shadow-md hidden sm:block">
                Providing top-tier veterinary care with a gentle touch.
                Your best friend deserves the best health.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 pb-12">
                <Link
                  href="#appointment"
                  className="inline-flex justify-center items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-900/30 transition transform hover:scale-[1.02] hover:bg-emerald-500 active:scale-95"
                >
                  Make an Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* 
               MOBILE & DESKTOP SERVICE CARDS 
               - Mobile: Horizontal Scroll Snap
               - Desktop: Grid
            */}
          <div className="mt-auto md:mt-0 w-full">
            {/* Label for mobile only */}


            <div className="
                    flex md:grid md:grid-cols-3 gap-4 
                    overflow-x-auto md:overflow-visible 
                    snap-x snap-mandatory 
                    pb-4 md:pb-0
                    -mx-4 px-4 md:mx-0 md:px-0
                    scrollbar-hide
                ">
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                <ServiceCard
                  icon={<PawPrint />}
                  title="Dentistry"
                  description="Keeping your dog's teeth and gums healthy."
                  href="#dentistry"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                <ServiceCard
                  icon={<Syringe />}
                  title="Pet Vaccination"
                  description="Pet health and wellness that's one step ahead."
                  href="#vaccination"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                <ServiceCard
                  icon={<Scissors />}
                  title="Spay & Neuter"
                  description="Keeping your dogs healthy & away from risks."
                  href="#spay-neuter"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* IMAGE - Order 2 on mobile (below text), Order 1 on desktop */}
            <div className="order-2 lg:order-1 relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                {/* Decorative box behind */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-100 rounded-2xl -z-10 hidden sm:block" />

                <Image
                  src={about}
                  alt="Veterinarian caring for a happy dog"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Subtle gradient at bottom for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </div>

              {/* Floating Stat Card - Mobile friendly positioning */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 max-w-[160px]">
                <p className="text-3xl font-black text-emerald-600">25+</p>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Years of Experience</p>
              </div>
            </div>

            {/* TEXT - Order 1 on mobile, Order 2 on desktop */}
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                About Us
              </span>

              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                We Love to Take Care of Your Pets
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                Alta Vista Animal Hospital was founded in 1998. Since then,
                our family pet hospital has been proudly serving Vancouver, BC
                by providing standard and emergency vet services.
              </p>

              {/* Features Grid */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Skilled Personnel",
                  "Compassionate Care",
                  "Best Veterinarians",
                  "Quality Food",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Buttons - Full width on mobile */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
                >
                  Book an Appointment
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border-2 border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-colors bg-transparent"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClinicGallery />
    </>
  );
}
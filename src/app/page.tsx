// app/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { PawPrint, Syringe, Scissors } from "lucide-react";
import hero from "../../public/hero4.jpg";
import about from "../../public/hero2.png";
import ServiceCard from "@/components/ServiceCards";

export default function Page() {
  return (
    <>
      {/* HERO - Mobile optimized with better spacing */}
      <section className="relative min-h-screen h-screen overflow-hidden">
        <Image
          src={hero}
          alt="Two happy bulldogs in a park"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col px-4 sm:px-6">
            {/* Top text block - better mobile spacing */}
            <div className="text-white text-center sm:text-left pt-40  lg:pt-64 flex-shrink-0">
              <h1 className="mx-auto sm:mx-0 max-w-2xl text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Because they aren't just pets,
                <span className="block mt-1">they are companions</span>
              </h1>

              <a
                href="#appointment"
                className="mt-6 sm:mt-5 inline-flex items-center rounded-xl bg-orange-500 px-5 py-3 text-sm sm:text-base font-semibold shadow transition hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Make an Appointment
              </a>
            </div>

            {/* Spacer to push cards down */}
            <div className="flex-1 min-h-[2rem]" />

            {/* Card tray - better mobile spacing from bottom */}
            <div className="flex-shrink-0 pb-6 sm:pb-8 pt-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
                <ServiceCard
                  icon={<PawPrint />}
                  title="Dentistry"
                  description="Keeping your dog's teeth and gums healthy."
                  href="#dentistry"
                  variant="default"
                />
                <ServiceCard
                  icon={<Syringe />}
                  title="Pet Vaccination"
                  description="Pet health and wellness that's one step ahead."
                  href="#vaccination"
                  variant="default"
                />
                <ServiceCard
                  icon={<Scissors />}
                  title="Spay & Neuter"
                  description="Keeping your dogs healthy & away from risks."
                  href="#spay-neuter"
                  variant="default"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="appointment" className="sr-only" aria-hidden />
      </section>

      {/* ABOUT SECTION - Mobile optimized */}
      <section className="relative bg-white min-h-screen">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-12 lg:gap-20 md:min-h-screen">
          {/* LEFT: image */}
          <div className="order-1 md:order-none">
            <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                <Image
                  src={about}
                  alt="Veterinarian caring for a happy dog"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 90vw"
                  className="object-cover"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 86%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 86%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: text */}
          <div>
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-orange-600 shadow-sm ring-1 ring-black/5">
              About Us
            </span>

            <h2 className="mt-4 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900">
              We Love to Take Care of Your Pets
            </h2>

            <p className="mt-4 sm:mt-4 max-w-prose text-sm sm:text-base leading-relaxed sm:leading-7 text-slate-600">
              Alta Vista Animal Hospital was founded in 1998 and since that time
              our family pet hospital has been proudly serving Vancouver, BC by
              providing standard and vet services.
            </p>

            <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                "Skilled Personnel",
                "Pets Care",
                "Best Veterinarians",
                "Quality Food",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 sm:gap-3">
                  <span className="grid h-7 w-7 sm:h-9 sm:w-9 flex-shrink-0 place-content-center rounded-md bg-orange-500 text-white shadow-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="sm:w-[18px] sm:h-[18px]"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                Book an Appointment
              </a>
              <a
                href="#"
                className="inline-flex justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

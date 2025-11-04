"use client";
import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import dog from "../../../public/hero2.png";
import cat from "../../../public/cat.png";
import bird from "../../../public/bird.png";

export default function Page() {
  return (
    <main
      className={[
        "relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900",
        // Make page scrollable; avoid fixed viewport height
        "min-h-screen pt-6",
        "overflow-y-auto",
      ].join(" ")}
      // Set your navbar height once (tweak as needed)
      style={{ ["--nav-h" as any]: "72px" }}
    >
      {/* Animated grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08] animate-pulse"
        style={{
          backgroundImage:
            "linear-gradient(#0ea5e9 1.5px, transparent 1.5px), linear-gradient(90deg,#0ea5e9 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px, 32px 32px",
          backgroundPosition: "0 0, 0 0",
          animationDuration: "8s",
        }}
      />

      {/* Radial soft vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-radial from-transparent via-transparent to-slate-900/5"
      />

      {/* Floating orbs (hide on mobile for perf) */}
      <div
        aria-hidden
        className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "0s", animationDuration: "20s" }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute bottom-20 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "5s", animationDuration: "25s" }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute top-40 right-20 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "10s", animationDuration: "22s" }}
      />

      {/* Layout */}
      <section
        className={[
          "mx-auto max-w-7xl px-4 sm:px-6",
          // Allow the section to grow beyond viewport to enable scroll
          "min-h-screen",
          // Clean spacing under fixed navbar + safe area
          "pt-[calc(var(--nav-h)+env(safe-area-inset-top))]",
          "flex flex-col",
        ].join(" ")}
      >
        {/* Header */}
        <header
          className={["text-center shrink-0 animate-fade-in-down", "pt-0"].join(
            " "
          )}
        >
          <h1 className=" sm:mt-2 text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Îngrijire medicală — curat, sigur, profesionist
          </h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base pb-4 text-slate-600 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              Câini
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
              Pisici
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: "1.2s" }}
              />
              Păsări
            </span>
          </div>
        </header>

        {/* Cards */}
        <div className="flex items-start justify-center">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 lg:gap-10 w-full">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <ServiceCard
                title="Câini"
                subtitle="Consultații, vaccinări, stomatologie"
                image={dog}
                variant="caini"
                href="servicii/caini"
                className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]"
              />
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              <ServiceCard
                title="Pisici"
                subtitle="Examinări, profilaxie, detartraj"
                image={cat}
                variant="pisici"
                href="servicii/pisici"
                className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]"
              />
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <ServiceCard
                title="Păsări"
                subtitle="Evaluări, tratamente, consiliere"
                image={bird}
                variant="pasari"
                href="servicii/pasari"
                className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <footer
          className="pb-[calc(env(safe-area-inset-bottom)+12px)] pt-10 sm:pt-0 text-center shrink-0 animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          <div className="flex md:pt-20 sm:pt-6 items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="tel:+40123456789"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border-2 border-slate-900 bg-white text-xs sm:text-sm font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Contact rapid
            </a>

            <a
              href="#programare"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border-2 border-slate-900 bg-gradient-to-r from-orange-500 to-orange-600 text-xs sm:text-sm font-bold text-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Programare online
            </a>
          </div>
        </footer>
      </section>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-down,
          .animate-fade-in-up,
          .animate-float {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}

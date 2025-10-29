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
        // Full height on sm+, let xs overflow if needed
        "relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900",
        "min-h-[100svh] sm:h-[100svh]",
        // allow vertical scroll on very small phones
        "overflow-y-auto sm:overflow-hidden",
      ].join(" ")}
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

      {/* One-screen layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 h-full min-h-[100svh] sm:h-[100svh] pt-30 md:pt-0 flex flex-col">
        {/* Header */}
        <header
          className={[
            "text-center shrink-0 animate-fade-in-down",
            // use safe-area top on mobile to avoid menu button overlap
            "pt-[calc(env(safe-area-inset-top)+16px)] sm:pt-8",
            "pb-4 sm:pb-6",
          ].join(" ")}
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-1.5  text-xs sm:text-sm font-bold shadow-[6px_6px_0_#0f172a] transition-all duration-300 hover:shadow-[8px_8px_0_#0f172a] hover:-translate-y-0.5 hover:-translate-x-0.5">
            <svg
              className="w-4 h-4 text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Servicii veterinare premium</span>
          </div>

          <h1 className="mt-4 sm:mt-6 text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Îngrijire medicală — curat, sigur, profesionist
          </h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base text-slate-600 font-medium">
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

        {/* Cards (responsive, shorter on mobile) */}
        <div className="flex-1 flex items-center justify-center py-4 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 lg:gap-10 w-full">
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
                className="w-full h-[280px] sm:h-[320px] md:h-[340px] lg:h-[360px]"
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
                className="w-full h-[280px] sm:h-[320px] md:h-[340px] lg:h-[360px]"
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
                className="w-full h-[280px] sm:h-[320px] md:h-[340px] lg:h-[360px]"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <footer
          className="pb-[calc(env(safe-area-inset-bottom)+12px)] text-center shrink-0 animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
            Echipă dedicată, tehnologie avansată, rezultate excelente
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
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

        /* Respect reduced motion on mobile */
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

// app/preturi/pisici/page.tsx
import React from "react";
import PricingCard, { Tier } from "@/components/PricingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prețuri servicii pentru Pisici",
  description:
    "Tarife transparente pentru servicii veterinare feline: check-up, profilaxie, detartraj.",
};

const stripe = "from-indigo-400 via-indigo-500 to-blue-600";
const accent = "from-indigo-400 to-blue-500";

const TIERS: Tier[] = [
  {
    name: "Check-up",
    price: "130 RON",
    blurb: "Examen clinic + consiliere ambient.",
    features: [
      "Examen clinic complet",
      "Sfaturi anti-stres",
      "Plan personalizat",
    ],
    cta: "Programează",
  },
  {
    name: "Profilaxie",
    price: "270 RON",
    blurb: "Vaccinare trivalentă + deparazitare.",
    features: [
      "Vaccinare anuală",
      "Deparazitare internă/externă",
      "Carnet actualizat",
    ],
    cta: "Alege pachetul",
  },
  {
    name: "Detartraj",
    price: "420 RON",
    period: "per sesiune",
    blurb: "Detartraj + lustruire cu supraveghere.",
    features: ["Detartraj complet", "Lustruire", "Recomandări post-procedură"],
    cta: "Rezervă",
  },
];

export default function Page() {
  return (
    <main className="min-h-[100svh] bg-slate-50 text-slate-900">
      <div
        aria-hidden
        className="fixed inset-0 -z-10  opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg,#0ea5e9 1px, transparent 1px)",
          backgroundSize: "28px 28px, 28px 28px",
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-30 pb-20">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-1 text-xs font-semibold shadow-[6px_6px_0_#0f172a]">
            Tarife Pisici
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            Prețuri servicii veterinare — Pisici
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Pachete prietenoase pentru feline relaxate și sănătoase.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              stripe={stripe}
              accent={accent}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

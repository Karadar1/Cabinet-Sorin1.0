// app/preturi/caini/page.tsx
import React from "react";
import PricingCard, { Tier } from "@/components/PricingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prețuri servicii pentru Câini",
  description:
    "Tarife transparente pentru servicii veterinare canine: consultație, profilaxie, îngrijire dentară.",
};

const stripe = "from-cyan-400 via-cyan-500 to-sky-600";
const accent = "from-cyan-400 to-sky-500";

const TIERS: Tier[] = [
  {
    name: "Consultație",
    price: "120 RON",
    blurb: "Evaluare generală + recomandări.",
    features: [
      "Anamneză și examen clinic",
      "Plan de investigații",
      "Recomandări nutriție",
    ],
    cta: "Programează",
  },
  {
    name: "Profilaxie",
    price: "250 RON",
    blurb: "Vaccinare + deparazitare + control.",
    features: [
      "Vaccinare anuală",
      "Deparazitare internă/externă",
      "Carnet actualizat",
    ],
    cta: "Alege pachetul",
  },
  {
    name: "Dental Care",
    price: "390 RON",
    period: "per sesiune",
    blurb: "Detartraj ultrasonic + lustruire.",
    features: ["Detartraj complet", "Lustruire", "Instrucțiuni acasă"],
    cta: "Rezervă",
  },
];

export default function Page() {
  return (
    <main className="min-h-[100svh] bg-slate-50 text-slate-900">
      {/* Grid background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg,#0ea5e9 1px, transparent 1px)",
          backgroundSize: "28px 28px, 28px 28px",
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-30 pb-20">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-1 text-xs font-semibold shadow-[6px_6px_0_#0f172a]">
            Tarife Câini
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            Prețuri servicii veterinare — Câini
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Pachete esențiale pentru sănătatea companionului tău.
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

// app/preturi/pasari/page.tsx
import React from "react";
import PricingCard, { Tier } from "@/components/PricingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prețuri servicii pentru Păsări",
  description:
    "Tarife transparente pentru servicii veterinare aviare: evaluare, profilaxie, consult avansat.",
};

const stripe = "from-emerald-400 via-emerald-500 to-teal-600";
const accent = "from-emerald-400 to-teal-500";

const TIERS: Tier[] = [
  {
    name: "Evaluare aviară",
    price: "140 RON",
    blurb: "Verificare stare generală + habitat.",
    features: ["Examen clinic", "Analiză dietă", "Ghid habitat"],
    cta: "Programează",
  },
  {
    name: "Profilaxie",
    price: "230 RON",
    blurb: "Pachet profilactic + screening paraziți.",
    features: ["Control periodic", "Deparazitare", "Carnet actualizat"],
    cta: "Alege pachetul",
  },
  {
    name: "Consult avansat",
    price: "360 RON",
    blurb: "Investigații suplimentare și plan tratament.",
    features: ["Examen detaliat", "Plan tratament", "Follow-up"],
    cta: "Rezervă",
  },
];

export default function Page() {
  return (
    <main className="min-h-[100svh] bg-slate-50 text-slate-900">
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
            Tarife Păsări
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            Prețuri servicii veterinare — Păsări
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Îngrijire specializată pentru exotice și domestice.
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

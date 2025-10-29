// components/PricingCard.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";

export type Tier = {
  name: string;
  price: string;
  period?: string;
  blurb?: string;
  features: string[];
  cta?: string;
};

export default function PricingCard({
  tier,
  stripe,
  accent,
}: {
  tier: Tier;
  stripe: string; // e.g. "from-cyan-400 via-cyan-500 to-sky-600"
  accent: string; // e.g. "from-cyan-400 to-sky-500"
}) {
  return (
    <article
      className={[
        "group relative overflow-hidden",
        "rounded-md border-2 border-slate-900 bg-white",
        "shadow-[8px_8px_0_#0f172a]",
        "transition-transform duration-300 ease-out",
        "hover:-translate-y-1 hover:translate-x-1",
        "focus-within:-translate-y-1 focus-within:translate-x-1",
      ].join(" ")}
      tabIndex={0}
    >
      {/* Top stripe */}
      <div className={`h-2 w-full bg-gradient-to-r ${stripe}`} />

      {/* Header */}
      <div className="p-6 pb-4">
        <h3 className="text-xl font-extrabold tracking-tight">{tier.name}</h3>
        {tier.blurb && (
          <p className="mt-1 text-sm text-slate-600">{tier.blurb}</p>
        )}
      </div>

      {/* Price */}
      <div className="px-6">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-extrabold">{tier.price}</div>
          {tier.period && (
            <div className="text-slate-500 text-sm">{tier.period}</div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 my-4 h-[2px] bg-slate-900" />

      {/* Features */}
      <ul className="px-6 space-y-2">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-[2px] border-2 border-slate-900 bg-white">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="p-6">
        <a
          href="#programare"
          className={[
            "inline-flex w-full items-center justify-center gap-2 rounded-md",
            "border-2 border-slate-900",
            "bg-gradient-to-r from-orange-500 to-orange-600",
            "px-4 py-2 text-sm font-extrabold text-slate-900",
            "transition-transform hover:-translate-y-0.5 hover:translate-x-0.5",
            "focus:outline-none focus:ring-4 focus:ring-orange-300",
          ].join(" ")}
        >
          {tier.cta ?? "Programează"}
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11.293 4.293a1 1 0 0 1 1.414 0l4.999 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
            />
          </svg>
        </a>
      </div>

      {/* Accent backdrop on hover */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute -inset-1 rounded-md opacity-0 blur-xl",
          `bg-gradient-to-r ${accent}`,
          "transition-opacity duration-500",
          "group-hover:opacity-20",
          "-z-10",
        ].join(" ")}
      />
    </article>
  );
}

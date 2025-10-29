// components/ServiceCard.tsx
"use client";

import Image from "next/image";
import React from "react";

type Variant = "caini" | "pisici" | "pasari";

type ServiceCardProps = {
  title: string;
  subtitle?: string;
  image: any; // <- string path from /public
  variant?: Variant;
  href?: string;
  className: string;
};

const palette: Record<
  Variant,
  {
    ring: string;
    stripe: string;
  }
> = {
  caini: {
    ring: "ring-cyan-400",
    stripe: "from-cyan-400 via-cyan-500 to-sky-600",
  },
  pisici: {
    ring: "ring-indigo-400",
    stripe: "from-indigo-400 via-indigo-500 to-blue-600",
  },
  pasari: {
    ring: "ring-emerald-400",
    stripe: "from-emerald-400 via-emerald-500 to-teal-600",
  },
};

export default function ServiceCard({
  title,
  subtitle,
  image,
  variant = "caini",
  href = "#",
  className,
}: ServiceCardProps) {
  const p = palette[variant];

  return (
    <div className="relative group">
      {/* Shadow plate: fades in and moves WITH the card */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-xl",
          "shadow-[12px_12px_0_#0f172a]",
          "opacity-0 transition-all duration-500 ease-out",
          "group-hover:opacity-100",
          "group-hover:-translate-x-2 group-hover:-translate-y-2",
        ].join(" ")}
        style={{ zIndex: 0, willChange: "transform" }}
      />

      {/* Card */}
      <article
        className={[
          "relative overflow-hidden",
          "rounded-xl border-2 border-slate-900 bg-white",
          "transition-all duration-500 ease-out",
          "group-hover:-translate-x-2 group-hover:-translate-y-2",
        ].join(" ")}
        style={{ zIndex: 1, willChange: "transform" }}
      >
        {/* Top stripe */}
        <div className="relative h-3 w-full overflow-hidden">
          <div
            className={[
              "absolute inset-0 bg-gradient-to-r",
              p.stripe,
              "transition-transform duration-700 ease-out",
              "group-hover:scale-x-110",
            ].join(" ")}
          />
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Image block */}
          <div className="relative mt-6 h-[180px] w-full">
            <div
              className="absolute inset-0 rounded-lg ring-2 ring-slate-900/10 ring-offset-2 ring-offset-white"
              aria-hidden="true"
            />
            <Image
              src={image} // <- e.g. "/hero2.png"
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-contain"
              priority
            />
          </div>

          {/* CTA (centered) */}
          <div className="mt-6 flex justify-center">
            <a
              href={href}
              className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-lg border-2 border-slate-900",
                "bg-gradient-to-r from-orange-500 to-orange-600",
                "px-6 py-3 text-sm font-extrabold text-slate-900",
                "transition-all duration-300",
                "hover:shadow-lg hover:shadow-orange-500/30",
                "hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-300",
              ].join(" ")}
            >
              Preturi
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M11.293 4.293a1 1 0 0 1 1.414 0l4.999 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Outer ring on hover */}
        <div
          className={[
            "pointer-events-none absolute inset-0 rounded-xl",
            "ring-2 ring-transparent transition-all duration-500 ease-out",
            "group-hover:ring-slate-900",
            p.ring,
          ].join(" ")}
          aria-hidden="true"
        />
      </article>
    </div>
  );
}

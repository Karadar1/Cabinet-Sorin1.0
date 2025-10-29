// components/ServiceCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";

type ServiceCardProps = {
  /** Leading icon (SVG/ReactNode) */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Supporting description */
  description: string;
  /** Optional link target; if omitted, renders a <div> */
  href?: string;
  /** Optional extra classes */
  className?: string;
  /**
   * Visual variant:
   * - "default": white card that turns orange on hover
   * - "highlight": orange card by default (like the middle one in your screenshot)
   */
  variant?: "default" | "highlight";
};

const base =
  "group relative rounded-2xl ring-1 ring-black/5 shadow-xl transition " +
  "duration-300 will-change-transform focus:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 focus-visible:ring-orange-400 hover:scale-[1.02] " +
  "active:scale-[0.99]";

const defaultStyles =
  "bg-white text-slate-900 hover:bg-orange-500 hover:text-white";

const highlightStyles = "bg-orange-500 text-white hover:brightness-110";

const inner = "p-5 md:p-6 flex items-start gap-4";

const iconBase = "shrink-0 rounded-xl p-3 transition duration-300";
const iconDefault = "bg-orange-100 group-hover:bg-white/20";
const iconHighlight = "bg-white/15 group-hover:bg-white/25";

function CardBody({
  icon,
  title,
  description,
  variant = "default",
}: Omit<ServiceCardProps, "href" | "className">) {
  return (
    <div className={inner}>
      <div
        className={`${iconBase} ${
          variant === "highlight" ? iconHighlight : iconDefault
        }`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-1 text-sm/6 opacity-80">{description}</p>
      </div>
    </div>
  );
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
  className = "",
  variant = "default",
}: ServiceCardProps) {
  const variantClasses =
    variant === "highlight" ? highlightStyles : defaultStyles;
  const classes = `${base} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={title}>
        <CardBody
          icon={icon}
          title={title}
          description={description}
          variant={variant}
        />
      </Link>
    );
  }

  return (
    <div className={classes} role="button" tabIndex={0} aria-label={title}>
      <CardBody
        icon={icon}
        title={title}
        description={description}
        variant={variant}
      />
    </div>
  );
}

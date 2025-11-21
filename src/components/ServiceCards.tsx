"use client";

import * as React from "react";
import Link from "next/link";

const PRIMARY_COLOR = "#224e4d"; // Dark green (brand)
const SECONDARY_COLOR = "#356154"; // Medium green (accent)

type FeatureCardProps = {
  /** Leading icon (SVG element) */
  icon: React.ReactElement;
  /** Card title */
  title: string;
  /** Supporting description */
  description: string;
  /** Optional link target; if omitted, renders a div-like button */
  href?: string;
  /** Optional extra classes */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const baseClasses =
  [
    "group",
    "relative flex flex-col items-start",
    "h-full overflow-hidden",
    "rounded-xl border border-gray-100 bg-white",
    // --- START: Changes for Smaller Mobile Size ---
    // Original: p-6
    "p-4 sm:p-6 shadow-lg", // Reduced padding from p-6 to p-4 on small screens
    // --- END: Changes for Smaller Mobile Size ---
    "transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:shadow-xl",
    // Color flip on hover using CSS vars
    "hover:border-[var(--card-primary)]",
    "hover:bg-[var(--card-primary)]",
    "hover:text-white",
    // Focus ring
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--card-secondary)]",
    "focus-visible:ring-offset-2",
    "active:scale-[0.99]",
    "cursor-pointer",
  ].join(" ");

type CardBodyProps = Pick<FeatureCardProps, "icon" | "title" | "description">;

function CardBody({ icon, title, description }: CardBodyProps) {
  const iconWrapperClasses =
    [
      // Original: h-12 w-12
      "mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg", // Reduced icon size
      // Subtle tinted background + brand-colored icon
      "bg-emerald-50 text-[var(--card-primary)]",
      "transition-all duration-300",
      "group-hover:bg-[var(--card-secondary)] group-hover:text-white",
    ].join(" ");

  return (
    <>
      {/* Icon badge */}
      <div className={iconWrapperClasses}>
        {React.cloneElement(icon, {
          // Original: w-6 h-6
          className: "w-5 h-5 sm:w-6 sm:h-6", // Reduced icon element size
          strokeWidth: 2,
          // Allow icon to keep its own className if it had one
          ...("className" in (icon.props as any) ? { className: (icon.props as any).className + " w-5 h-5 sm:w-6 sm:h-6" } : {}),
        } as any)}
      </div>

      {/* Title */}
      {/* Original: text-lg font-bold */}
      <h3 className="mb-1 text-base sm:text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>

      {/* Description */}
      {/* Original: text-sm leading-relaxed */}
      <p className="flex-grow text-xs sm:text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-white/80">
        {description}
      </p>
    </>
  );
}

export default function ModernFeatureCard({
  icon,
  title,
  description,
  href,
  className = "",
  ...rest
}: FeatureCardProps) {
  const classes = `${baseClasses} ${className}`.trim();

  // CSS variables so Tailwind arbitrary values stay static & still use your brand colors
  const style = {
    "--card-primary": PRIMARY_COLOR,
    "--card-secondary": SECONDARY_COLOR,
  } as React.CSSProperties;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        aria-label={title}
      >
        <CardBody icon={icon} title={title} description={description} />
      </Link>
    );
  }

  return (
    <div
      className={classes}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={title}
      {...rest}
    >
      <CardBody icon={icon} title={title} description={description} />
    </div>
  );
}
"use client";

import { SiInstagram, SiLinkedin, SiX, SiYoutube } from "react-icons/si";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export const Nav = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>
        {active && <LinksOverlay onClose={() => setActive(false)} />}
      </AnimatePresence>
    </>
  );
};

const LinksOverlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {/* Backdrop to dim content and capture clicks */}
      <motion.button
        aria-label="Close menu"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black"
      />
      <nav
        className="fixed right-4 top-4 z-[1000] h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden"
        aria-label="Main"
      >
        <Logo />
        <LinksContainer />
        <FooterCTAs />
      </nav>
    </>
  );
};

const LinksContainer = () => {
  return (
    <motion.div className="space-y-4 p-12 pl-4 md:pl-20">
      {LINKS.map((l, idx) => (
        <NavLink key={l.title} href={l.href} idx={idx}>
          {l.title}
        </NavLink>
      ))}
    </motion.div>
  );
};

const NavLink = ({
  children,
  href,
  idx,
}: {
  children: ReactNode;
  href: string;
  idx: number;
}) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      href={href}
      className="block text-5xl font-semibold text-white transition-colors hover:text-amber-300 md:text-7xl"
    >
      {children}.
    </motion.a>
  );
};

const Logo = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="#"
      className="grid h-20 w-20 place-content-center rounded-br-xl rounded-tl-xl bg-white transition-colors hover:bg-violet-50"
    >
      <svg
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-amber-600"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"></path>
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"></path>
      </svg>
    </motion.a>
  );
};

const HamburgerButton = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* Expanding violet underlay */}
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 16, right: 16 }}
        className="fixed z-[900] rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 shadow-lg shadow-violet-800/20"
      />

      {/* Toggle button stays ABOVE overlay for easy close */}
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`group fixed right-4 top-4 z-[1100] h-20 w-20 bg-white/0 transition-all hover:bg-white/20 ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        }`}
        aria-expanded={active}
        aria-controls="menu"
      >
        {/* Keep geometry consistent: use top/left + translate for ALL bars */}
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-1 w-10 bg-white"
          style={{ top: "35%", left: "50%", x: "-50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-1 w-10 bg-white"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-1 bg-white"
          style={{
            width: "1.25rem",
            top: "65%",
            left: "calc(50% + 10px)",
            x: "-50%",
            y: "-50%",
          }}
        />
        <span className="sr-only">{active ? "Close menu" : "Open menu"}</span>
      </motion.button>
    </>
  );
};

const FooterCTAs = () => {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
        {SOCIAL_CTAS.map((l, idx) => {
          return (
            <motion.a
              key={idx}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <l.Component className="text-xl text-white transition-colors hover:text-violet-300" />
            </motion.a>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-white px-3 py-3 text-4xl uppercase text-black-200 transition-colors hover:bg-white hover:text-amber-600 md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <span className="hidden md:block">contact us</span> <FiArrowRight />
      </motion.button>
    </>
  );
};

const LINKS = [
  { title: "acasa", href: "/" },
  { title: "echipa", href: "/echipa" },
  { title: "servicii", href: "/servicii" },
  { title: "contact", href: "/contact" },
];

const SOCIAL_CTAS = [
  { Component: SiX, href: "#" },
  { Component: SiInstagram, href: "#" },
  { Component: SiLinkedin, href: "#" },
  { Component: SiYoutube, href: "#" },
];

/* ---------- animation variants ---------- */
// --- at the top of the file ---
import type { Variants, Transition } from "framer-motion";

// --- replace your variants with the typed ones below ---

// at top:

// spring for the underlay
const UNDERLAY_SPRING: Transition = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

// smooth 3-step for bars
const BAR_TWEEN: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.28,
};

// --- variants ---

export const UNDERLAY_VARIANTS: Variants = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100vh - 32px)",
    transition: UNDERLAY_SPRING,
  },
  closed: {
    width: "80px",
    height: "80px",
    transition: { ...UNDERLAY_SPRING, delay: 0.75 },
  },
};

// Use tween keyframes for rotate/top to allow 3 values
export const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
      transition: BAR_TWEEN,
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
      transition: BAR_TWEEN,
    },
  },
  middle: {
    open: { rotate: ["0deg", "0deg", "-45deg"], transition: BAR_TWEEN },
    closed: { rotate: ["-45deg", "0deg", "0deg"], transition: BAR_TWEEN },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["65%", "50%", "50%"],
      left: ["calc(50% + 10px)", "50%", "50%"],
      width: ["1.25rem", "2.5rem", "2.5rem"],
      transition: BAR_TWEEN,
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "65%"],
      left: ["50%", "50%", "calc(50% + 10px)"],
      width: ["2.5rem", "1.25rem", "1.25rem"],
      transition: BAR_TWEEN,
    },
  },
} satisfies Record<"top" | "middle" | "bottom", Variants>;

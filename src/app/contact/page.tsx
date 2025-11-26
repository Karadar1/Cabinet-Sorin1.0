"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Constants for consistency, used in inline styles and logic
const PRIMARY_COLOR = "#224e4d"; // Dark Green
const SECONDARY_COLOR = "#356154"; // Medium Green
const LIGHT_ACCENT = "#e0ebeb"; // Custom light minty background

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Refs for fade/scale sections
  const formRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // GSAP chip animation refs
  const chipsScope = useRef<HTMLDivElement | null>(null);
  const chipsRef = useRef<HTMLAnchorElement[]>([]);
  const textsRef = useRef<HTMLSpanElement[]>([]);

  // Basic IntersectionObserver to fade content (form/map)
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => entry.target.classList.add("animate-in"),
            index * 100
          );
        }
      });
    }, observerOptions);

    if (formRef.current) observer.observe(formRef.current);
    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, []);

  // GSAP: “ball → pill” morph for chips when revealed
  useGSAP(
    () => {
      const items = chipsRef.current.filter(Boolean);
      const texts = textsRef.current;

      // Initial BALL state for ALL chips
      items.forEach((el, i) => {
        const textEl = texts[i];
        gsap.set(el, {
          width: 56, // visible ball
          height: 56, // Fixed height for initial ball state
          borderRadius: 9999,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: "center",
          gap: 0,
          opacity: 1,
        });

        // Use autoAlpha for better performance than display/opacity combo
        gsap.set(textEl, {
          autoAlpha: 0,
          x: 8,
        });
      });

      // Observer: morph ball -> pill
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target as HTMLAnchorElement;
            const idx = items.indexOf(el);
            const textEl = texts[idx];

            const tl = gsap.timeline({
              defaults: { ease: "power3.out" },
              delay: (idx % 4) * 0.05,
            });

            tl.to(el, {
              width: "100%",
              height: "auto", // Auto height to fit content
              borderRadius: 9999,
              paddingLeft: 16,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              justifyContent: "flex-start",
              gap: 12,
              duration: 0.6,
            })
              .to(textEl, { autoAlpha: 1, x: 0, duration: 0.35 }, "-=0.2");

            io.unobserve(el);
          });
        },
        { threshold: 0.15 }
      );

      items.forEach((el) => io.observe(el));
      return () => io.disconnect();
    },
    { scope: chipsScope }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } else setErrors(newErrors);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      detail: "0755 090 880\n0256 442 989",
      href: "tel:0755090880",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      detail: "clinicabioveti@gmail.com",
      href: "mailto:clinicabioveti@gmail.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      detail: "Str. Crișan Nr.8, Timișoara",
      href: "#map-location",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hours",
      detail: "L-V: 08:00–18:00\nSâmb: 08:30–14:00",
      href: "#",
    },
  ];

  // Reset refs on each render to ensure indices match current render cycle
  chipsRef.current = [];
  textsRef.current = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-cyan-50 pt-20">
      <style>{`
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.animate-in { opacity: 1; transform: translateY(0); }
        .input-focus { transition: all 0.3s ease; }
        .input-focus:focus { transform: translateY(-2px); box-shadow: 0 4px 12px ${PRIMARY_COLOR}30; } 
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 pt-20 md:pt-0">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Contactează-<span style={{ color: PRIMARY_COLOR }}>ne</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suntem aici pentru a ajuta prietenii tăi necuvântători. Contactează-ne pentru programări sau urgențe.
          </p>
        </div>

        {/* Tubular contact chips */}
        <div
          ref={chipsScope}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <div key={index} className="w-full">
              <a
                ref={(el) => {
                  if (el) chipsRef.current[index] = el;
                }}
                href={info.href}
                aria-label={
                  typeof info.detail === "string" ? info.detail : "contact"
                }
                // Tailwind classes fixed: Removed template literals from class strings
                className="
                  group flex items-center overflow-hidden
                  rounded-full border border-[#e0ebeb] bg-white
                  min-h-[56px] h-auto shadow-sm
                  transition-all hover:shadow-md hover:border-[#356154]
                  focus:outline-none focus:ring-2 focus:ring-[#356154]
                "
              >
                <span
                  style={{ backgroundColor: LIGHT_ACCENT, color: PRIMARY_COLOR }}
                  // Tailwind classes fixed: Removed template literals from class strings
                  className="
                    ml-2 grid h-10 w-10 place-content-center
                    rounded-full ring-1 ring-inset ring-[#e0ebeb]
                    transition group-hover:text-white group-hover:bg-[#224e4d]
                    flex-shrink-0
                  "
                >
                  {info.icon}
                </span>

                <span
                  ref={(el) => {
                    if (el) textsRef.current[index] = el;
                  }}
                  className="ml-3 mr-4 text-sm font-medium text-gray-800 leading-tight whitespace-pre-line"
                  style={{ willChange: "opacity, transform" }}
                >
                  {info.detail}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Form + Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef} className="fade-up">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Trimite un <span style={{ color: PRIMARY_COLOR }}>Mesaj</span>
              </h3>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Mulțumim! Te vom contacta în curând.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numele tău *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    // Tailwind classes fixed: Removed template literals
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#224e4d] input-focus`}
                    placeholder="Ion Popescu"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#224e4d] input-focus`}
                    placeholder="ion@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#224e4d] input-focus`}
                    placeholder="07xx xxx xxx"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviciu dorit *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.service ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#224e4d] input-focus`}
                  >
                    <option value="">Selectează un serviciu</option>
                    <option value="consultation">Consultație Generală</option>
                    <option value="vaccination">Vaccinare</option>
                    <option value="surgery">Chirurgie</option>
                    <option value="analysis">Analize</option>
                    <option value="other">Altceva</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#224e4d] input-focus resize-none`}
                    placeholder="Spune-ne cu ce te putem ajuta..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                  className="w-full hover:bg-[#356154] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Trimite Mesaj</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Map / Location panel */}
          <div className="space-y-8" id="map-location">
            <div ref={mapRef} className="fade-up">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Unde ne <span style={{ color: PRIMARY_COLOR }}>Găsești</span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Clinica este situată central în Timișoara, pe strada Crișan.
                </p>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?q=Strada+Crisan+Nr.8,+Timisoara&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="Locație Clinica Bioveti"
                    className="h-full w-full border-0"
                  ></iframe>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                    <span className="font-medium">
                      Strada Crișan Nr. 8, Timișoara
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#e0ebeb]">
              <p className="text-sm text-gray-700">
                Pentru urgențe în afara programului, vă rugăm să apelați la{" "}
                <span style={{ color: PRIMARY_COLOR, fontWeight: "bold" }}>
                  112
                </span>{" "}
                sau la cel mai apropiat spital veterinar non-stop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
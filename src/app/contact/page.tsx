"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
          height: 56,
          borderRadius: 9999,
          paddingLeft: 0,
          paddingRight: 0,
          justifyContent: "center",
          gap: 0,
          opacity: 1,
        });
        gsap.set(textEl, {
          opacity: 0,
          display: "none",
          x: 8,
          ariaHidden: true as any, // avoids SSR warnings
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
              height: 56,
              borderRadius: 9999,
              paddingLeft: 16,
              paddingRight: 20,
              justifyContent: "flex-start",
              gap: 12,
              duration: 0.6,
            })
              .set(textEl, { display: "block" }, "<")
              .to(textEl, { opacity: 1, x: 0, duration: 0.35 }, "-=0.2");

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
      detail: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      detail: "care@petcompanions.com",
      href: "mailto:care@petcompanions.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      detail: "123 Pet Care Lane, Suite 100, Cityville, ST 12345",
      href: "#",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hours",
      detail: "Mon–Fri: 8AM–6PM, Sat: 9AM–4PM",
      href: "#",
    },
  ];

  // IMPORTANT: reset refs length each render so indices match map order
  chipsRef.current = [];
  textsRef.current = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 pt-20 via-orange-50 to-yellow-50">
      <style>{`
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.animate-in { opacity: 1; transform: translateY(0); }
        .input-focus { transition: all 0.3s ease; }
        .input-focus:focus { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(249,115,22,.2); }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 pt-20 md:pt-0">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help your furry companions. Reach out to us for
            appointments, questions, or just to say hello!
          </p>
        </div>

        {/* Tubular contact chips — GSAP animates from balls → pills */}
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
                className="
                  group flex items-center overflow-hidden
                  rounded-full border border-orange-200/60 bg-white
                  h-14 shadow-sm
                  transition-all hover:shadow-md hover:border-orange-300
                  focus:outline-none focus:ring-2 focus:ring-orange-300
                "
                // NOTE: no `w-full` here; GSAP controls width
              >
                <span
                  className="
                    ml-2 grid h-10 w-10 place-content-center
                    rounded-full bg-orange-100 text-orange-600
                    ring-1 ring-inset ring-orange-200
                    transition group-hover:bg-orange-200 group-hover:text-orange-700
                    flex-shrink-0
                  "
                >
                  {info.icon}
                </span>

                <span
                  ref={(el) => {
                    if (el) textsRef.current[index] = el;
                  }}
                  className="ml-3 mr-4 truncate text-sm font-medium text-gray-800"
                  style={{ willChange: "opacity, transform" }}
                >
                  {info.detail}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef} className="fade-up">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a <span className="text-orange-500">Message</span>
              </h3>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-orange-500 input-focus`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-orange-500 input-focus`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-orange-500 input-focus`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.service ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-orange-500 input-focus`}
                  >
                    <option value="">Select a service</option>
                    <option value="dentistry">Dentistry</option>
                    <option value="vaccination">Pet Vaccination</option>
                    <option value="spay-neuter">Spay & Neuter</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-orange-500 input-focus resize-none`}
                    placeholder="Tell us about your pet and how we can help..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Map / Location panel */}
          <div className="space-y-8">
            <div ref={mapRef} className="fade-up">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Find us on the <span className="text-orange-500">Map</span>
                </h3>
                <p className="text-gray-600 mb-4">
                  We’re conveniently located with parking available. Tap the map
                  for directions.
                </p>
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    title="Clinic location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509553!2d144.95373631531674!3d-37.81627974201248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c1b3a51f!2sYour%20Clinic!5e0!3m2!1sen!2s!4v1611812441422!5m2!1sen!2s"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>
                      123 Pet Care Lane, Suite 100, Cityville, ST 12345
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
              <p className="text-sm text-gray-700">
                Emergencies after hours? Visit our{" "}
                <a
                  href="#"
                  className="text-orange-600 font-semibold underline-offset-2 hover:underline"
                >
                  urgent care
                </a>{" "}
                page for 24/7 options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

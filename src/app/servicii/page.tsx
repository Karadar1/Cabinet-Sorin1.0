"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Assuming this is needed, replacing usage with simple img tag for portability
import { 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Heart,
  Syringe,
  ClipboardList
} from "lucide-react";

// --- Custom Colors ---
const PRIMARY_COLOR = "#224e4d"; // Dark Green
const SECONDARY_COLOR = "#356154"; // Medium Green (Accent)
const LIGHT_ACCENT_BG = "bg-green-50"; // Standard Tailwind light green background
const LIGHT_ACCENT_TEXT = "text-green-700"; // Standard Tailwind light green text
// ---------------------

// Placeholder for service data since the original import is external
const services = [
  { slug: 'consultatii', title: 'Consultații Generale', shortDescription: 'Evaluări anuale de sănătate, vaccinări și sfaturi preventive personalizate.', icon: Stethoscope },
  { slug: 'chirurgie', title: 'Chirurgie', shortDescription: 'Intervenții de la sterilizări la proceduri ortopedice complexe, efectuate în condiții de maximă siguranță.', icon: Heart },
  { slug: 'vaccinari', title: 'Vaccinări', shortDescription: 'Programe complete de vaccinare adaptate nevoilor și stilului de viață al animalului tău.', icon: Syringe },
  { slug: 'dermatologie', title: 'Dermatologie', shortDescription: 'Diagnostic și tratament pentru afecțiuni ale pielii, blănii și alergiilor.', icon: ClipboardList },
];

export default function ServicesPage() {
  
  // Custom Tailwind classes using arbitrary values
  const primaryBg = `bg-[${PRIMARY_COLOR}]`;
  const secondaryBg = `bg-[${SECONDARY_COLOR}]`;
  const secondaryText = `text-[${SECONDARY_COLOR}]`;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans pt-20">
      
      {/* --- HERO / HEADER SECTION --- */}
      <div className={`bg-gray-50/50 border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Serviciile Noastre <span style={{ color: PRIMARY_COLOR }}>Veterinare</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Oferim o gamă completă de servicii medicale, de la controale de rutină la chirurgie avansată, toate sub supravegherea unei echipe dedicate.
          </p>
        </div>
      </div>
      {/* ------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Intro Text */}
            <section className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-600">
                La Cabinet Sorin, oferim o gamă completă de servicii medicale veterinare. Fiecare procedură este efectuată cu atenție la detalii, folosind echipamente moderne și protocoale actualizate.
              </p>
            </section>

            {/* Service List Grid */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                Lista Procedurilor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  // Uses the updated ServiceCategoryCard logic
                  <ServiceCategoryCard 
                    key={service.slug}
                    title={service.title}
                    description={service.shortDescription}
                    href={`/servicii/${service.slug}`}
                    Icon={service.icon}
                  />
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                Întrebări frecvente
              </h2>
              <div className="space-y-4">
                <FAQItem 
                  question="Când este necesară o consultație?" 
                  answer="Recomandăm un control periodic la fiecare 6-12 luni. De asemenea, orice schimbare în comportamentul, apetitul sau nivelul de energie al animalului necesită o vizită la medic."
                  secondaryColor={SECONDARY_COLOR}
                  lightBg={LIGHT_ACCENT_BG}
                />
                <FAQItem 
                  question="Cum pregătesc animalul pentru operație?" 
                  answer="De regulă, este necesar un post alimentar de 12 ore înainte de anestezie. Apa poate fi lăsată la discreție. Medicul vă va oferi instrucțiuni specifice în funcție de intervenție."
                  secondaryColor={SECONDARY_COLOR}
                  lightBg={LIGHT_ACCENT_BG}
                />
                <FAQItem 
                  question="Oferiți servicii de urgență?" 
                  answer="Da, preluăm urgențe în timpul programului de lucru. Pentru urgențe în afara programului, vă rugăm să ne contactați telefonic pentru îndrumare."
                  secondaryColor={SECONDARY_COLOR}
                  lightBg={LIGHT_ACCENT_BG}
                />
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
           <div className="lg:col-span-1 space-y-8">
            
            {/* Appointment CTA */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Programează o vizită</h3>
              <p className="text-slate-600 text-sm mb-6">
                Evită așteptarea și asigură-te că primești atenția necesară la ora potrivită.
              </p>
              <Link 
                href="/#programare" 
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Programare Online
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                Contact Rapid
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <p>Strada Exemplului nr. 12, Timișoara</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                  <p>
                    <a href="tel:0712345678" className="hover:text-emerald-400 transition-colors">0712 345 678</a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <p>Luni - Vineri: 09:00 - 20:00</p>
                    <p>Sâmbătă: 10:00 - 14:00</p>
                    <p className="text-slate-400">Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">De ce să alegi Cabinet Sorin?</h3>
              <ul className="space-y-3">
                {[
                  "Echipă cu experiență vastă",
                  "Aparatură modernă",
                  "Mediu steril și sigur",
                  "Abordare blândă și empatică",
                  "Gamă completă de servicii"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// --- ServiceCategoryCard Component (Updated for new colors and Lucide icons) ---
interface ServiceCategoryCardProps {
  title: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string, strokeWidth?: number }>;
}

function ServiceCategoryCard({ title, description, href, Icon }: ServiceCategoryCardProps) {
  const primaryText = `text-[${PRIMARY_COLOR}]`;
  const secondaryText = `text-[${SECONDARY_COLOR}]`;
  const lightBg = "bg-gray-100";
  const hoverBg = "bg-white";

  return (
    <Link 
      href={href}
      className={`group block p-6 rounded-xl border border-gray-200 transition-all duration-300 ${lightBg} hover:${hoverBg} hover:shadow-md hover:border-[${SECONDARY_COLOR}] hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className={`text-xl font-bold text-slate-900`}>{title}</h3>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${lightBg} ${primaryText} transition-all duration-300 group-hover:${secondaryText}`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      </div>
      <p className="text-slate-600 text-sm mb-4 min-h-[60px]">
        {description}
      </p>
      <div className={`flex items-center gap-2 text-sm font-semibold ${primaryText} group-hover:${secondaryText} group-hover:translate-x-1 transition-transform`}>
        Citește mai mult <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

// --- FAQItem Component (Updated for new colors) ---
function FAQItem({ question, answer, secondaryColor, lightBg }: { 
    question: string; 
    answer: string; 
    secondaryColor: string;
    lightBg: string;
  }) {
  const [isOpen, setIsOpen] = useState(false);
  const secondaryText = `text-[${secondaryColor}]`;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left bg-white hover:${lightBg} transition-colors`}
      >
        <span className="font-semibold text-slate-900">{question}</span>
        {isOpen ? (
          <ChevronUp className={`w-5 h-5 ${secondaryText}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${secondaryText}`} />
        )}
      </button>
      {isOpen && (
        <div className={`p-4 ${lightBg} border-t border-slate-200 text-slate-700 text-sm leading-relaxed`}>
          {answer}
        </div>
      )}
    </div>
  );
}